import z from "zod/v4";
import { NotionRichTextPropertySchema } from "../../utils/notion/src/schema/properties";

export const OrganisationSchema = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    logoUrl: z.url().optional().nullable(), // file
    description: NotionRichTextPropertySchema,
  }),
  relations: {},
};
