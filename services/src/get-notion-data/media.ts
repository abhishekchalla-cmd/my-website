import * as config from "@abhishekchalla/config";
import { mediaFields, mediaDBs } from "@abhishekchalla/schema/index";
import {
  FileBlockObjectResponse,
  getAllDbRecords,
  getBlockRecordMap,
  ImageBlockObjectResponse,
  notionClient,
  PdfBlockObjectResponse,
  VideoBlockObjectResponse,
} from "@abhishekchalla/notion/index";
import { NotionFilesPropertySchema } from "@abhishekchalla/notion/schema/properties";
import z from "zod/v4";
import {
  getFileKeyFromSignedUrl,
  getPublicFileUrl,
} from "@abhishekchalla/services/utils/s3";
import {
  getFileExtensionFromUrl,
  moveRemoteFileToS3,
} from "@abhishekchalla/services/utils/file";
import {
  DB_TYPE_TO_DB_CONFIG_KEY_MAP,
  UPLOADABLE_NOTION_BLOCK_TYPES,
} from "@abhishekchalla/services/get-notion-data/consts";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";

export const getNotionMedia = async () => {
  return {
    dbFilePropertiesMedia: await getMediaFromDBFileProperties(),
    dbMediaPagesMedia: await getMediaFromDBPages(),
  };
};

export const getMediaFromDBFileProperties = async () => {
  let mediaUrls: { [mediaId: string]: string } = {};

  await Promise.all(
    Object.keys(mediaFields).map(async (mediaDB) => {
      const dbDsId =
        config.notion.db[
          DB_TYPE_TO_DB_CONFIG_KEY_MAP[mediaDB as keyof typeof mediaFields]
        ];
      if (!dbDsId)
        throw new Error("Data Source ID not found for DB: " + mediaDB);

      const objects: any[] = await getAllDbRecords(dbDsId);

      await Promise.all(
        objects.map(async (obj) => {
          for (const mediaFieldKey in mediaFields[
            mediaDB as keyof typeof mediaFields
          ]) {
            const mediaField = (
              mediaFields[mediaDB as keyof typeof mediaFields] as any
            )[mediaFieldKey];

            const mfRes: z.infer<typeof NotionFilesPropertySchema> =
              obj.properties[mediaField];
            await Promise.all(
              mfRes.files.map(async (f) => {
                if (f.type === "external")
                  mediaUrls[f.name as string] = f.external.url;
                else if (f.type === "file") {
                  const fileKey = getFileKeyFromSignedUrl(f.file.url);

                  await moveRemoteFileToS3(f.file.url, {
                    Bucket: config.s3.bucketName,
                    Key: "assets/" + fileKey,
                    ACL: "public-read",
                  });

                  const fileUrl = getPublicFileUrl(
                    config.s3.bucketName,
                    config.s3.region,
                    "assets/" + fileKey,
                  );

                  mediaUrls[fileKey] = fileUrl;
                }
              }),
            );
          }
        }),
      );
    }),
  );

  return mediaUrls;
};

export const getMediaFromDBPages = async () => {
  const mediaUrls: { [blockId: string]: string } = {};
  const traversedBlocks: { [blockId: string]: true } = {};

  for (const mediaDB in mediaDBs) {
    console.log("Media DB: ", mediaDB);

    const records = await getAllDbRecords(
      config.notion.db[
        DB_TYPE_TO_DB_CONFIG_KEY_MAP[mediaDB as keyof typeof mediaDBs]
      ],
    );

    for (const r of records.slice(0, 1)) {
      // todo: remove slice function
      const record = r as z.infer<typeof NotionPageBaseSchema>;

      const { block: childBlocks } = await getBlockRecordMap(record.id);

      const uploadedBlocks = (
        await Promise.all(
          Object.values(childBlocks)
            .map((b) => (b.value as any).value)
            .filter((b) => !traversedBlocks[b.id])
            .filter((b) =>
              Object.keys(UPLOADABLE_NOTION_BLOCK_TYPES).includes(
                (b as any).type,
              ),
            )
            .map(async (b: any) => {
              const type = b.type as keyof typeof UPLOADABLE_NOTION_BLOCK_TYPES;

              const blockData = (
                (await notionClient.blocks.retrieve({
                  block_id: b.id,
                })) as any
              )[type] as
                | ImageBlockObjectResponse["image"]
                | VideoBlockObjectResponse["video"]
                | PdfBlockObjectResponse["pdf"]
                | FileBlockObjectResponse["file"];

              let fileFinalUrl;

              if (blockData.type === "file") {
                const s3SignedUrl = blockData.file.url;
                const s3FileKey =
                  "assets/block-media--" +
                  b.id +
                  "." +
                  getFileExtensionFromUrl(s3SignedUrl as string);

                await moveRemoteFileToS3(s3SignedUrl as string, {
                  ACL: "public-read",
                  Bucket: config.s3.bucketName,
                  Key: s3FileKey,
                });

                fileFinalUrl = getPublicFileUrl(
                  config.s3.bucketName,
                  config.s3.region,
                  s3FileKey,
                );
              } else {
                fileFinalUrl = blockData.external.url;
              }

              traversedBlocks[b.id] = true;

              return { blockId: b.id, url: fileFinalUrl };
            }),
        )
      ).reduce(
        (acc, cur) => ({
          ...acc,
          [cur.blockId]: cur.url,
        }),
        {},
      );

      Object.assign(mediaUrls, uploadedBlocks);
    }
  }

  return mediaUrls;
};
