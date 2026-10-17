import z from "zod";
import { SchemaDef } from "./utils/schema";
import { DB_TYPES, DBTypes } from "./db-types";

export const PersonSchema: SchemaDef<DBTypes> = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    linkedinUrl: z.url().optional(),
  }),
  relations: {
    experience: { dbType: DB_TYPES.experience, isMulti: true },
  },
};
