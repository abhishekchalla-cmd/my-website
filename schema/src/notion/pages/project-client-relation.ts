import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionMultiSelectPropertySchema,
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/schema/notion/properties";

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
