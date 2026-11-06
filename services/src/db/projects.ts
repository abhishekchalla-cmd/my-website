import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import * as config from "@abhishekchalla/config";
import { NotionProjectSchema } from "@abhishekchalla/schema/notion/project";
import z from "zod/v4";
import {
  NOTION_PROJECT_TO_PROJECT_ROLE,
  NOTION_PROJECT_TYPE_TO_PROJECT_TYPE,
  NOTION_PROJECT_VISIBILITY_TO_PROJECT_VISIBILITY,
  PROJECT_ROLE,
  PROJECT_TYPE,
  PROJECT_VISIBILITY,
  ProjectSchema,
} from "@abhishekchalla/schema/project";
import { getDateOrNil } from "../utils/date";
import { resolveNotionMediaUrl } from "../utils/notion";

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
  // console.log(JSON.stringify(res, null, 2));
  return {
    id: res.id,
    name: res.properties.Name.title[0]?.plain_text,
    description: res.properties.Description,
    startDate: getDateOrNil(res.properties["Start date"].date?.start),
    endDate: getDateOrNil(res.properties["End Date"].date?.end),
    role: res.properties.Role.multi_select
      .map((e) => PROJECT_ROLE[NOTION_PROJECT_TO_PROJECT_ROLE[e.name]])
      .filter((e) => e),
    type:
      res.properties.Type.multi_select[0]?.name &&
      PROJECT_TYPE[
        NOTION_PROJECT_TYPE_TO_PROJECT_TYPE[
          res.properties.Type.multi_select[0].name
        ]
      ],
    visibility:
      res.properties.Visibility.select?.name &&
      PROJECT_VISIBILITY[
        NOTION_PROJECT_VISIBILITY_TO_PROJECT_VISIBILITY[
          res.properties.Visibility.select.name
        ]
      ],
    thumbnailUrl: resolveNotionMediaUrl(res.properties.Thumbnail.files[0]),
    cover: resolveNotionMediaUrl(res.properties.Cover.files[0]),
  };
};
