import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionRelationPropertySchema,
  NotionTitlePropertySchema,
  NotionUrlPropertySchema,
} from "@abhishekchalla/schema/notion/properties";

export const NotionBasicInfoSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    "LinkedIn link": NotionUrlPropertySchema,
    "Project People Relation": NotionRelationPropertySchema,
    Testimonies: NotionRelationPropertySchema,
  }),
});

export type BasicInfo = z.infer<typeof NotionBasicInfoSchema>;
