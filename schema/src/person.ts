import z from "zod";
import { ExperienceSchema } from "@abhishekchalla/schema/experience";

export const PersonSchema = z.object({
  id: z.string(),
  name: z.string(),
  linkedinUrl: z.url().optional(),
  experience: z.array(ExperienceSchema).optional(),
});

export type Person = z.infer<typeof PersonSchema>;
