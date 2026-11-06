import { z } from "zod/v4";
import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionFilesPropertySchema,
  NotionRelationPropertySchema,
  NotionRichTextPropertySchema,
  NotionTitlePropertySchema,
  NotionUrlPropertySchema,
} from "@abhishekchalla/notion/schema/properties";

export const NotionOrganisationSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    Name: NotionTitlePropertySchema,
    Description: NotionRichTextPropertySchema,
    Thumbnail: NotionFilesPropertySchema,
    Experience: NotionRelationPropertySchema,
    "Project Client Relation": NotionRelationPropertySchema,
    "Project People Relation": NotionRelationPropertySchema,
    Website: NotionUrlPropertySchema.optional().nullable(),
  }),
});

export type Organisation = z.infer<typeof NotionOrganisationSchema>;
