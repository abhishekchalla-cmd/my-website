import * as config from "@abhishekchalla/config";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import { NotionExperienceSchema } from "@abhishekchalla/schema/notion/experience";

export const getExperiences = () =>
  getAllDbRecords<typeof NotionExperienceSchema>(config.notion.db.experience);

export const getExperience = (id: string) =>
  getPageById<typeof NotionExperienceSchema>(id);
