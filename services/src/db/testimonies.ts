import * as config from "@abhishekchalla/config";
import { NotionTestimonySchema } from "@abhishekchalla/schema/notion/pages/testimony";
import { getAllDbRecords } from "@abhishekchalla/services/notion";
import { getPageById } from "../notion/pages";

export const getTestimonies = () =>
  getAllDbRecords<typeof NotionTestimonySchema>(config.notion.db.testimonies);

export const getTestimony = (id: string) =>
  getPageById<typeof NotionTestimonySchema>(id);
