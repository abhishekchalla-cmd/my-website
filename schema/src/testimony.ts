import z from "zod";
import { DB_TYPES } from "./db-types";
import { IS_MULTI } from "@abhishekchalla/orm/consts";

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
      isMulti: IS_MULTI.FALSE,
    },
  },
};
