import z from "zod";
import { DB_TYPES } from "./db-types";

export const PersonSchema = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    linkedinUrl: z.url().optional(),
  }),
  relations: {
    experience: { dbType: DB_TYPES.experience, isMulti: true },
  },
};
