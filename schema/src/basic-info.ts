import z from "zod/v4";

export const BasicInfoSchema = {
  base: z.object({
    name: z.string(),
    dateOfBirth: z.date(), // date
    location: z.string(),
    email: z.email(),
    githubUrl: z.url().optional().nullable(),
    linkedinUrl: z.url().optional().nullable(),
    pictureUrl: z.url(), // file
    coverUrl: z.url(), // file
  }),
  relations: {},
};
