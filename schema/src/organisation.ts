import z from "zod";
import { NotionRichTextPropertySchema } from "./notion/properties";
import { SchemaDef } from "./utils/schema";
import { DBTypes } from "./db-types";

export const OrganisationSchema: SchemaDef<DBTypes> = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    logoUrl: z.url().optional(),
    description: NotionRichTextPropertySchema,
  }),
  relations: {},
};
