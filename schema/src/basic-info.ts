import z from "zod";
import { SchemaDef } from "./utils/schema";
import { DBTypes } from "./db-types";

export const BasicInfoSchema: SchemaDef<DBTypes> = {
  base: z.object({
    name: z.string(),
    dateOfBirth: z.date(),
    location: z.string(),
    email: z.email(),
    githubUrl: z.url().optional(),
    linkedinUrl: z.url().optional(),
    pictureUrl: z.url(),
    coverUrl: z.url(),
  }),
  relations: {},
};
