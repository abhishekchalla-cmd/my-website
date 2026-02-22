import * as config from "@abhishekchalla/config";
import { getAllDbRecords } from "@abhishekchalla/services/notion";
import { getPageById } from "../notion/pages";
import { NotionExperienceSchema } from "@abhishekchalla/schema/notion/pages/experience";

export const getExperiences = () =>
  getAllDbRecords<typeof NotionExperienceSchema>(config.notion.db.experience);

export const getExperience = (id: string) =>
  getPageById<typeof NotionExperienceSchema>(id);
