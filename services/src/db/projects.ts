import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import * as config from "@abhishekchalla/config";
import { NotionProjectSchema } from "@abhishekchalla/schema/notion/project";

export const getProjects = () =>
  getAllDbRecords<typeof NotionProjectSchema>(config.notion.db.projects);

export const getProject = (projectId: string) =>
  getPageById<typeof NotionProjectSchema>(projectId);
