import { z } from "zod";
import { NotionPageBaseSchema } from "@abhishekchalla/schema/notion/page-base";
import {
  NotionFilesPropertySchema,
  NotionRelationPropertySchema,
  NotionRichTextPropertySchema,
  NotionTitlePropertySchema,
  NotionUrlPropertySchema,
} from "@abhishekchalla/schema/notion/properties";

export const NotionOrganisationSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    Description: NotionRichTextPropertySchema,
    Thumbnail: NotionFilesPropertySchema,
    Experience: NotionRelationPropertySchema,
    "Project Client Relation": NotionRelationPropertySchema,
    "Project People Relation": NotionRelationPropertySchema,
    Website: NotionUrlPropertySchema.optional(),
  }),
});

export type Organisation = z.infer<typeof NotionOrganisationSchema>;
