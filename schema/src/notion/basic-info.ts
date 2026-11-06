import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionDatePropertySchema,
  NotionEmailPropertySchema,
  NotionFilesPropertySchema,
  NotionRichTextPropertySchema,
  NotionTitlePropertySchema,
  NotionUrlPropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionBasicInfoSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    Avatar: NotionFilesPropertySchema,
    Cover: NotionFilesPropertySchema,
    Email: NotionEmailPropertySchema,
    "Github link": NotionUrlPropertySchema,
    "Date of birth": NotionDatePropertySchema,
    "LinkedIn link": NotionUrlPropertySchema,
    "Based in": NotionRichTextPropertySchema,
  }),
});

export type BasicInfo = z.infer<typeof NotionBasicInfoSchema>;
