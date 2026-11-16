import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionNumberPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionOfferingsSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Title: NotionTitlePropertySchema,
    Order: NotionNumberPropertySchema,
  }),
});

export type Experience = z.infer<typeof NotionOfferingsSchema>;
