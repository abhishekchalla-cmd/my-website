import * as config from "@abhishekchalla/config";
import { NotionTestimonySchema } from "@abhishekchalla/schema/notion/testimony";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";

export const getTestimonies = () =>
  getAllDbRecords<typeof NotionTestimonySchema>(config.notion.db.testimonies);

export const getTestimony = (id: string) =>
  getPageById<typeof NotionTestimonySchema>(id);
