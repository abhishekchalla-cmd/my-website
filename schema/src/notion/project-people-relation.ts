import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionProjectPeopleRelationSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Role: NotionTitlePropertySchema,
    Project: NotionRelationPropertySchema,
    Person: NotionRelationPropertySchema,
    Order: NotionNumberPropertySchema,
  }),
});

export type ProjectPeopleRelation = z.infer<
  typeof NotionProjectPeopleRelationSchema
>;
