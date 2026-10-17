import z from "zod";
import { SchemaDef } from "./utils/schema";
import { DB_TYPES, DBTypes } from "./db-types";

export const ExperienceSchema: SchemaDef<DBTypes> = {
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
