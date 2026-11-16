import { NotionFilesPropertySchema } from "@abhishekchalla/notion/schema/properties";
import z from "zod/v4";
import { media } from "@abhishekchalla/services/notion-data.json";
import { getFileKeyFromSignedUrl } from "./s3";
import { BlockObjectResponse } from "@abhishekchalla/notion/index";

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

export const resolveNotionDBPageMediaUrl = (
  url: string,
  block: BlockObjectResponse,
) => {
  if (!url) return null;

  if (
    block.type === "image" ||
    block.type === "video" ||
    block.type === "pdf" ||
    block.type === "file"
  ) {
    return (media.dbMediaPagesMedia as any)[block.id];
  }
};
