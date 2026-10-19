import z from "zod";

export const BasicInfoSchema = {
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
