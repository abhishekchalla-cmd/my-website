import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionMultiSelectPropertySchema,
  NotionNumberPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/schema/notion/properties";

export const NotionSkillSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    Score: NotionNumberPropertySchema,
    Type: NotionMultiSelectPropertySchema,
    Order: NotionNumberPropertySchema,
  }),
});

export type Skill = z.infer<typeof NotionSkillSchema>;
