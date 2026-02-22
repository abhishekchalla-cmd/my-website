import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/schema/notion/properties";

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
