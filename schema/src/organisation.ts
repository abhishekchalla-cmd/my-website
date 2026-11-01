import z from "zod";
import { NotionRichTextPropertySchema } from "../../utils/notion/src/schema/properties";

export const OrganisationSchema = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    logoUrl: z.url().optional(),
    description: NotionRichTextPropertySchema,
  }),
  relations: {},
};
