import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionMultiSelectPropertySchema,
  NotionNumberPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionSkillSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    Score: NotionNumberPropertySchema,
    Type: NotionMultiSelectPropertySchema,
    Order: NotionNumberPropertySchema,
  }),
});

export type Skill = z.infer<typeof NotionSkillSchema>;
