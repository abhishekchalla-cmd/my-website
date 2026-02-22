import * as config from "@abhishekchalla/config";
import { NotionProjectPeopleRelationSchema } from "@abhishekchalla/schema/notion/pages/project-people-relation";
import { getAllDbRecords } from "@abhishekchalla/services/notion";
import { getPageById } from "../notion/pages";

export const getProjectPeopleRelations = () =>
  getAllDbRecords<typeof NotionProjectPeopleRelationSchema>(
    config.notion.db.projectPeopleRelation,
  );

export const getProjectPeopleRelation = (projectPeopleRelationId: string) =>
  getPageById<typeof NotionProjectPeopleRelationSchema>(
    projectPeopleRelationId,
  );
