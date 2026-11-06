import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import * as config from "@abhishekchalla/config";
import { NotionProjectSchema } from "@abhishekchalla/schema/notion/project";
import z from "zod/v4";
import {
  PROJECT_ROLE,
  PROJECT_TYPE,
  PROJECT_VISIBILITY,
  ProjectSchema,
} from "@abhishekchalla/schema/project";

export const getProjects: () => Promise<
  z.infer<typeof ProjectSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionProjectSchema>(config.notion.db.projects).then(
    (res) => res.map(translate),
  );

export const getProject: (
  projectId: string,
) => Promise<z.infer<typeof ProjectSchema.base>> = (projectId) =>
  getPageById<typeof NotionProjectSchema>(projectId).then(translate);

const translate: (
  res: z.infer<typeof NotionProjectSchema>,
) => z.infer<typeof ProjectSchema.base> = (res) => {
  return {
    id: res.id,
    name: res.properties.Name.title[0].plain_text,
    description: res.properties.Description,
    startDate: res.properties["Start date"].date?.start,
    endDate: res.properties["End Date"].date?.end,
    role: PROJECT_ROLE[res.properties.Role.multi_select[0]?.id],
    type: PROJECT_TYPE[res.properties.Type.multi_select[0]?.id],
    visibility: PROJECT_VISIBILITY[res.properties.Visibility.select?.id],
    thumbnailUrl: res.properties.Thumbnail.files[0]?.name,
    cover: res.properties.Cover.files[0]?.name,
  };
};
