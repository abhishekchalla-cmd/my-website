import * as config from "@abhishekchalla/config";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import { ProjectDetailPageSchema } from "@abhishekchalla/schema/project-detail-page";
import { NotionProjectDetailPageSchema } from "@abhishekchalla/schema/notion/project-detail-page";
import z from "zod/v4";
import { resolveNotionDBPropMediaUrl } from "@abhishekchalla/services/utils/notion";

export const getProjectDetailPages: () => Promise<
  z.infer<typeof ProjectDetailPageSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionProjectDetailPageSchema>(
    config.notion.db.projectDetailPages,
  ).then((res) => res.map(translate));

export const getProjectDetailPage: (
  id: string,
) => Promise<z.infer<typeof ProjectDetailPageSchema.base>> = (id) =>
  getPageById<typeof NotionProjectDetailPageSchema>(id).then(translate);

const translate = (res: z.infer<typeof NotionProjectDetailPageSchema>) =>
  ProjectDetailPageSchema.base.parse({
    id: res.id,
    title: res.properties.Name.title[0].text.content,
    cover: resolveNotionDBPropMediaUrl(res.properties.Cover.files[0]),
  });
