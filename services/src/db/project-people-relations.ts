import * as config from "@abhishekchalla/config";
import { NotionProjectPeopleRelationSchema } from "@abhishekchalla/schema/notion/project-people-relation";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import z from "zod/v4";
import { ProjectPeopleRelationSchema } from "@abhishekchalla/schema/project";

export const getProjectPeopleRelations: () => Promise<
  z.infer<typeof ProjectPeopleRelationSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionProjectPeopleRelationSchema>(
    config.notion.db.projectPeopleRelation,
  ).then((res) => res.map(translate));

export const getProjectPeopleRelation: (
  projectPeopleRelationId: string,
) => Promise<z.infer<typeof ProjectPeopleRelationSchema.base>> = (
  projectPeopleRelationId,
) =>
  getPageById<typeof NotionProjectPeopleRelationSchema>(
    projectPeopleRelationId,
  ).then(translate);

const translate: (
  res: z.infer<typeof NotionProjectPeopleRelationSchema>,
) => z.infer<typeof ProjectPeopleRelationSchema.base> = (res) => ({
  id: res.id,
  role: res.properties.Role.title[0]?.plain_text,
});
