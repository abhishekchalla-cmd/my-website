import { NotionPageBaseSchema } from "@abhishekchalla/notion/schema/page-base";
import {
  NotionRelationPropertySchema,
  NotionFormulaPropertySchema,
  NotionSelectPropertySchema,
  NotionMultiSelectPropertySchema,
  NotionRichTextPropertySchema,
  NotionDatePropertySchema,
  NotionFilesPropertySchema,
  NotionNumberPropertySchema,
  NotionTitlePropertySchema,
} from "@abhishekchalla/notion/schema/properties";
import z from "zod";

export const NotionProjectSchema = NotionPageBaseSchema.extend({
  properties: z.object({
    "Project Detail Pages": NotionRelationPropertySchema,
    Contracts: NotionRelationPropertySchema,
    Clients: NotionFormulaPropertySchema,
    Proposals: NotionRelationPropertySchema,
    Visibility: NotionSelectPropertySchema,
    Type: NotionMultiSelectPropertySchema,
    Description: NotionRichTextPropertySchema,
    "Start date": NotionDatePropertySchema,
    Role: NotionMultiSelectPropertySchema,
    Tasks: NotionRelationPropertySchema,
    Cover: NotionFilesPropertySchema,
    "End Date": NotionDatePropertySchema,
    "👣 Project stages": NotionRelationPropertySchema,
    Thumbnail: NotionFilesPropertySchema,
    Order: NotionNumberPropertySchema,
    "Project Client Relation": NotionRelationPropertySchema,
    "Project People Relation": NotionRelationPropertySchema,
    Name: NotionTitlePropertySchema,
  }),
});
