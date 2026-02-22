import * as config from "@abhishekchalla/config";
import { NotionSkillSchema } from "@abhishekchalla/schema/notion/pages/skill";
import { getAllDbRecords } from "@abhishekchalla/services/notion";
import { getPageById } from "../notion/pages";

export const getSkills = () =>
  getAllDbRecords<typeof NotionSkillSchema>(config.notion.db.skills);

export const getSkill = (id: string) =>
  getPageById<typeof NotionSkillSchema>(id);
