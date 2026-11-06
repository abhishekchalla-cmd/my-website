import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionDatePropertySchema,
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionExperienceSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Title: NotionTitlePropertySchema,
    Organisation: NotionRelationPropertySchema,
    Person: NotionRelationPropertySchema,
    "Start date": NotionDatePropertySchema,
    "End Date": NotionDatePropertySchema,
    Order: NotionNumberPropertySchema,
  }),
});

export type Experience = z.infer<typeof NotionExperienceSchema>;
