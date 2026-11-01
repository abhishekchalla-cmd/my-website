import * as config from "@abhishekchalla/config";
import { NotionPersonSchema } from "@abhishekchalla/schema/notion/person";
import { getAllDbRecords, getPageById } from "@abhishekchalla/notion";

export const getPeople = () =>
  getAllDbRecords<typeof NotionPersonSchema>(config.notion.db.people);

export const getPerson = (id: string) =>
  getPageById<typeof NotionPersonSchema>(id);
