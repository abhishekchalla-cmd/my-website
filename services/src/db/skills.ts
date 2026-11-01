import * as config from "@abhishekchalla/config";
import { NotionSkillSchema } from "@abhishekchalla/schema/notion/skill";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";

export const getSkills = () =>
  getAllDbRecords<typeof NotionSkillSchema>(config.notion.db.skills);

export const getSkill = (id: string) =>
  getPageById<typeof NotionSkillSchema>(id);
