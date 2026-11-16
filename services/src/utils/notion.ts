import { NotionFilesPropertySchema } from "@abhishekchalla/notion/schema/properties";
import z from "zod/v4";
import { media } from "@abhishekchalla/services/notion-data.json";
import { getFileKeyFromSignedUrl } from "./s3";
import { BlockType } from "notion-types";

export const resolveNotionDBPropMediaUrl = (
  mediaValue: z.infer<typeof NotionFilesPropertySchema>["files"][number],
) => {
  if (!mediaValue) return;

  if (mediaValue.type === "external") return mediaValue.external.url;
  else if (mediaValue.type === "file") {
    const key = getFileKeyFromSignedUrl(mediaValue.file.url);
    return (
      media as {
        dbFilePropertiesMedia: Record<string, string>;
      }
    ).dbFilePropertiesMedia[key];
  }
};

export const resolveNotionDBPageMediaUrl = <
  BlockData extends {
    id: string;
    type: BlockType;
  },
>(
  url: string | undefined,
  blockData: BlockData,
) => {
  if (!url) return null;

  if (
    blockData.type === "image" ||
    blockData.type === "video" ||
    blockData.type === "pdf" ||
    blockData.type === "file"
  ) {
    return (media.dbMediaPagesMedia as any)[blockData.id];
  }
};
