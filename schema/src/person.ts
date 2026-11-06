import z from "zod/v4";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import { IS_MULTI } from "@abhishekchalla/orm/consts";

export const PersonSchema = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    linkedinUrl: z.url().optional(),
  }),
  relations: {
    experience: { dbType: DB_TYPES.experience, isMulti: IS_MULTI.TRUE },
  },
};
