import * as config from "@abhishekchalla/config";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import { NotionProjectClientRelationSchema } from "@abhishekchalla/schema/notion/project-client-relation";
import {
  PROJECT_CLIENT_TYPE,
  ProjectClientRelationSchema,
} from "@abhishekchalla/schema/project";
import z from "zod/v4";

export const getProjectClientRelations: () => Promise<
  z.infer<typeof ProjectClientRelationSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionProjectClientRelationSchema>(
    config.notion.db.projectClientRelation,
  ).then((res) => res.map(translate));

export const getProjectClientRelation: (
  projectClientRelationId: string,
) => Promise<z.infer<typeof ProjectClientRelationSchema.base>> = (
  projectClientRelationId,
) =>
  getPageById<typeof NotionProjectClientRelationSchema>(
    projectClientRelationId,
  ).then(translate);

export const translate: (
  res: z.infer<typeof NotionProjectClientRelationSchema>,
) => z.infer<typeof ProjectClientRelationSchema.base> = (res) => ({
  id: res.id,
  type: PROJECT_CLIENT_TYPE[res.properties["Client type"].multi_select[0].id],
  title: res.properties.Title.title[0].plain_text,
});
