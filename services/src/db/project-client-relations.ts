import * as config from "@abhishekchalla/config";
import { getAllDbRecords } from "@abhishekchalla/services/notion";
import { getPageById } from "../notion/pages";
import { NotionProjectClientRelationSchema } from "@abhishekchalla/schema/notion/pages/project-client-relation";

export const getProjectClientRelations = () =>
  getAllDbRecords<typeof NotionProjectClientRelationSchema>(
    config.notion.db.projectClientRelation,
  );

export const getProjectClientRelation = (projectClientRelationId: string) =>
  getPageById<typeof NotionProjectClientRelationSchema>(
    projectClientRelationId,
  );
