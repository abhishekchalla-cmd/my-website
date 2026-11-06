import { NotionFilesPropertySchema } from "@abhishekchalla/notion/schema/properties";
import z from "zod/v4";
import { media } from "@abhishekchalla/services/notion-data.json";
import { getFileKeyFromSignedUrl } from "./s3";

export const resolveNotionMediaUrl = (
  mediaValue: z.infer<typeof NotionFilesPropertySchema>["files"][number],
) => {
  if (!mediaValue) return;

  if (mediaValue.type === "external") return media[mediaValue.external.url];
  else if (mediaValue.type === "file") {
    const key = getFileKeyFromSignedUrl(mediaValue.file.url);
    return media[key];
  }
};
