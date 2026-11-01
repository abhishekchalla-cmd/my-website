import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
  NotionUrlPropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionPersonSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    "LinkedIn link": NotionUrlPropertySchema,
    Experience: NotionRelationPropertySchema,
    "Project Client Relation": NotionRelationPropertySchema,
    Testimonies: NotionRelationPropertySchema,
  }),
});
