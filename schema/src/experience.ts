import z from "zod/v4";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import { IS_MULTI } from "@abhishekchalla/orm/consts";

export const ExperienceSchema = {
  base: z.object({
    id: z.string(),
    title: z.string(),
    startDate: z.date(), // date
    endDate: z.date().optional().nullable(), // date
  }),
  relations: {
    company: { dbType: DB_TYPES.organisation, isMulti: IS_MULTI.FALSE },
  },
};
