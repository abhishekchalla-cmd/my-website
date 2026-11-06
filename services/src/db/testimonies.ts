import * as config from "@abhishekchalla/config";
import { NotionTestimonySchema } from "@abhishekchalla/schema/notion/testimony";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import z from "zod/v4";
import { TestimonySchema } from "@abhishekchalla/schema/testimony";

export const getTestimonies: () => Promise<
  z.infer<typeof TestimonySchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionTestimonySchema>(
    config.notion.db.testimonies,
  ).then((res) => res.map(translate));

export const getTestimony: (
  id: string,
) => Promise<z.infer<typeof TestimonySchema.base>> = (id) =>
  getPageById<typeof NotionTestimonySchema>(id).then(translate);

const translate: (
  res: z.infer<typeof NotionTestimonySchema>,
) => z.infer<typeof TestimonySchema.base> = (res) => ({
  id: res.id,
  title: res.properties.Title.title[0].plain_text,
  testimony: res.properties.Testimony.rich_text
    .map((e) => e.plain_text)
    .join("\n"),
  rating: res.properties.Rating.number,
  order: res.properties.Order.number,
});
