import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionMultiSelectPropertySchema,
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionProjectClientRelationSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Title: NotionTitlePropertySchema,
    Project: NotionRelationPropertySchema,
    Organisation: NotionRelationPropertySchema,
    People: NotionRelationPropertySchema,
    "Client type": NotionMultiSelectPropertySchema,
    Order: NotionNumberPropertySchema,
  }),
});

export type ProjectClientRelation = z.infer<
  typeof NotionProjectClientRelationSchema
>;
