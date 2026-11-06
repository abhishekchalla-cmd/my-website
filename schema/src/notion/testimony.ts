import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionRichTextPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";

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
