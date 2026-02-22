import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionRichTextPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/schema/notion/properties";

export const NotionTestimonySchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Title: NotionTitlePropertySchema,
    Testimony: NotionRichTextPropertySchema,
    Rating: NotionNumberPropertySchema,
    By: NotionRelationPropertySchema,
    Order: NotionNumberPropertySchema,
  }),
});

export type Testimony = z.infer<typeof NotionTestimonySchema>;
