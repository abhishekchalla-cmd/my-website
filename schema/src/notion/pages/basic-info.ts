import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionDatePropertySchema,
  NotionEmailPropertySchema,
  NotionFilesPropertySchema,
  NotionRichTextPropertySchema,
  NotionTitlePropertySchema,
  NotionUrlPropertySchema,
} from "@abhishekchalla/schema/notion/properties";

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
