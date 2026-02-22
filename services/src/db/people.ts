import * as config from "@abhishekchalla/config";
import { NotionPersonSchema } from "@abhishekchalla/schema/notion/pages/person";
import { getAllDbRecords } from "@abhishekchalla/services/notion";
import { getPageById } from "@abhishekchalla/services/notion/pages";

export const getPeople = () =>
  getAllDbRecords<typeof NotionPersonSchema>(config.notion.db.people);

export const getPerson = (id: string) =>
  getPageById<typeof NotionPersonSchema>(id);
