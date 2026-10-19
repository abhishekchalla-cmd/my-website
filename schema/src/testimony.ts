import z from "zod";
import { DB_TYPES } from "./db-types";

export const TestimonySchema = {
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
