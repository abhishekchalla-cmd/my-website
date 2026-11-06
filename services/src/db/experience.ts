import * as config from "@abhishekchalla/config";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import { ExperienceSchema } from "@abhishekchalla/schema/experience";
import { NotionExperienceSchema } from "@abhishekchalla/schema/notion/experience";
import z from "zod/v4";

export const getExperiences: () => Promise<
  z.infer<typeof ExperienceSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionExperienceSchema>(
    config.notion.db.experience,
  ).then((res) => res.map(translate));

export const getExperience: (
  id: string,
) => Promise<z.infer<typeof ExperienceSchema.base>> = (id) =>
  getPageById<typeof NotionExperienceSchema>(id).then(translate);

const translate = (res: z.infer<typeof NotionExperienceSchema>) => ({
  id: res.id,
  title: res.properties.Title.title[0].text.content,
  startDate: res.properties["Start date"].date.start,
  endDate: res.properties["End Date"].date.end,
});
