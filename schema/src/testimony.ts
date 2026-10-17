import z from "zod";
import { SchemaDef } from "./utils/schema";
import { DB_TYPES, DBTypes } from "./db-types";

export const TestimonySchema: SchemaDef<DBTypes> = {
  base: z.object({
    id: z.string(),
    title: z.string(),
    testimony: z.string(),
    rating: z.number(),
    order: z.number(),
  }),
  relations: {
    person: {
      dbType: DB_TYPES.person,
      isMulti: false,
    },
  },
};
