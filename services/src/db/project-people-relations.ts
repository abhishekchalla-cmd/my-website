import * as config from "@abhishekchalla/config";
import { NotionProjectPeopleRelationSchema } from "@abhishekchalla/schema/notion/project-people-relation";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";

export const getProjectPeopleRelations = () =>
  getAllDbRecords<typeof NotionProjectPeopleRelationSchema>(
    config.notion.db.projectPeopleRelation,
  );

export const getProjectPeopleRelation = (projectPeopleRelationId: string) =>
  getPageById<typeof NotionProjectPeopleRelationSchema>(
    projectPeopleRelationId,
  );
