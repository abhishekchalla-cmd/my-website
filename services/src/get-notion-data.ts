import * as config from "@abhishekchalla/config";
import { notionClient } from "@abhishekchalla/notion/client";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import {
  finalSchemaVRawSchemaRelationsMapping,
  mediaFields,
} from "@abhishekchalla/schema/index";
import { writeFileSync } from "node:fs";
import _set from "lodash/set";
import { resolve } from "node:path";
import { getAllDbRecords } from "@abhishekchalla/notion/index";
import { NotionFilesPropertySchema } from "@abhishekchalla/notion/schema/properties";
import z from "zod/v4";
import {
  getFileKeyFromSignedUrl,
  getPublicFileUrl,
} from "@abhishekchalla/services/utils/s3";
import { moveRemoteFileToS3 } from "@abhishekchalla/services/utils/file";

const DB_TYPE_TO_DB_CONFIG_KEY_MAP: {
  [DBType in keyof typeof DB_TYPES]: keyof typeof config.notion.db;
} = {
  basicInfo: "basicInfo",
  experience: "experience",
  skill: "skills",
  testimony: "testimonies",
  organisation: "organisations",
  person: "people",
  projectClientRelation: "projectClientRelation",
  projectPeopleRelation: "projectPeopleRelation",
  project: "projects",
};

const getRelationPropertiesInfo = async () => {
  const relationPropertiesInfo: {
    [DBType in keyof typeof DB_TYPES]?: {
      [FSRelationKey in keyof (typeof finalSchemaVRawSchemaRelationsMapping)[DBType]]: string;
    };
  } = {};

  for (const dbType in finalSchemaVRawSchemaRelationsMapping) {
    const dbConfigKey = DB_TYPE_TO_DB_CONFIG_KEY_MAP[dbType];
    const dbDsId = config.notion.db[dbConfigKey];
    const dsInfo = await notionClient.dataSources.retrieve({
      data_source_id: dbDsId,
    });

    const finalSchemaRelationKeyMapping =
      finalSchemaVRawSchemaRelationsMapping[dbType];

    for (const rawPropKey in dsInfo.properties) {
      for (const fsRelationKey in finalSchemaRelationKeyMapping)
        if (finalSchemaRelationKeyMapping[fsRelationKey] === rawPropKey)
          _set(
            relationPropertiesInfo,
            `${dbType}.${fsRelationKey}`,
            dsInfo.properties[rawPropKey].id,
          );
    }
  }

  return relationPropertiesInfo;
};

export const getNotionMedia = async () => {
  let mediaUrls: { [mediaId: string]: string } = {};

  await Promise.all(
    Object.keys(mediaFields).map(async (mediaDB) => {
      const dbDsId = config.notion.db[DB_TYPE_TO_DB_CONFIG_KEY_MAP[mediaDB]];
      const objects = await getAllDbRecords(dbDsId);

      await Promise.all(
        objects.map(async (obj) => {
          for (const mediaField of mediaFields[mediaDB]) {
            const mfRes: z.infer<typeof NotionFilesPropertySchema> =
              obj.properties[mediaField];
            await Promise.all(
              mfRes.files.map(async (f) => {
                if (f.type === "external") mediaUrls[f.name] = f.external.url;
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

export const getNotionDbInfo = async () => {
  const data = {
    relationPropertiesInfo: await getRelationPropertiesInfo(),
    media: await getNotionMedia(),
  };

  writeFileSync(
    resolve(__dirname, "./notion-data.json"),
    JSON.stringify(data, null, 2),
  );
};

if (require.main.filename === __filename)
  getNotionDbInfo().catch(console.error);
