import { getAllDbRecords } from "@abhishekchalla/services/notion";
import * as config from "@abhishekchalla/config";
import { NotionProjectSchema } from "@abhishekchalla/schema/notion/pages/project";
import { getPageById } from "../notion/pages";

export const getProjects = () =>
  getAllDbRecords<typeof NotionProjectSchema>(config.notion.db.projects);

export const getProject = (projectId: string) =>
  getPageById<typeof NotionProjectSchema>(projectId);
