import z from "zod";
import { NotionRichTextPropertySchema } from "./notion/properties";

export const OrganisationSchema = z.object({
  id: z.string(),
  name: z.string(),
  logoUrl: z.url().optional(),
  description: NotionRichTextPropertySchema,
});

export type Organisation = z.infer<typeof OrganisationSchema>;
