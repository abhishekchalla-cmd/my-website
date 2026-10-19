import z from "zod";
import { DB_TYPES } from "./db-types";

export const ExperienceSchema = {
  base: z.object({
    id: z.string(),
    title: z.string(),
    startDate: z.iso.datetime(),
    endDate: z.iso.datetime().optional(),
  }),
  relations: {
    company: { dbType: DB_TYPES.organisation, isMulti: false },
  },
};
