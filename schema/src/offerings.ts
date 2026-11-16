import z from "zod/v4";

export const OfferingsSchema = {
  base: z.object({
    id: z.string(),
    title: z.string(),
    order: z.number().optional(),
  }),
  relations: {},
};
