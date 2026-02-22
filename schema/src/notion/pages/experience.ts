import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionDatePropertySchema,
  NotionNumberPropertySchema,
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/schema/notion/properties";

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
