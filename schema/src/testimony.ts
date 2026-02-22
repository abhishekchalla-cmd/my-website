import z from "zod";
import { PersonSchema } from "@abhishekchalla/schema/person";

export const TestimonySchema = z.object({
  title: z.string(),
  by: PersonSchema,
  testimony: z.string(),
  rating: z.number(),
  order: z.number(),
});

export type Testimony = z.infer<typeof TestimonySchema>;
