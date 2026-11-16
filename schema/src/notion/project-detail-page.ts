import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionFilesPropertySchema,
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionProjectDetailPageSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    Projects: NotionRelationPropertySchema,
    Cover: NotionFilesPropertySchema,
  }),
});

export type Experience = z.infer<typeof NotionProjectDetailPageSchema>;
