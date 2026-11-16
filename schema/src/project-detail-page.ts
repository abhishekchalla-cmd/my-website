import z from "zod/v4";
import { DB_TYPES } from "./db-types";
import { IS_MULTI } from "@abhishekchalla/orm/consts";

export const ProjectDetailPageSchema = {
  base: z.object({
    id: z.string(),
    title: z.string(),
    cover: z.url(),
  }),
  relations: {
    project: {
      dbType: DB_TYPES.project,
      isMulti: IS_MULTI.FALSE,
    },
  },
};
