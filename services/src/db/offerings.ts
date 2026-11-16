import * as config from "@abhishekchalla/config";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import { OfferingsSchema } from "@abhishekchalla/schema/offerings";
import { NotionOfferingsSchema } from "@abhishekchalla/schema/notion/offerings";
import z from "zod/v4";

export const getOfferings: () => Promise<
  z.infer<typeof OfferingsSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionOfferingsSchema>(
    config.notion.db.offerings,
  ).then((res) => res.map(translate));

export const getOffering: (
  id: string,
) => Promise<z.infer<typeof OfferingsSchema.base>> = (id) =>
  getPageById<typeof NotionOfferingsSchema>(id).then(translate);

const translate = (res: z.infer<typeof NotionOfferingsSchema>) =>
  OfferingsSchema.base.parse({
    id: res.id,
    title: res.properties.Title.title[0].text.content,
    order: res.properties.Order.number || undefined,
  });
