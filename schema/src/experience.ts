import z from "zod";
import { OrganisationSchema } from "@abhishekchalla/schema/organisation";

export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: OrganisationSchema,
  startDate: z.iso.datetime(),
  endDate: z.iso.datetime().optional(),
});

export type Experience = z.infer<typeof ExperienceSchema>;
