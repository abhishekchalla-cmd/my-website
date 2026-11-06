import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import * as config from "@abhishekchalla/config";
import { NotionBasicInfoSchema } from "@abhishekchalla/schema/notion/basic-info";
import z from "zod/v4";
import { BasicInfoSchema } from "@abhishekchalla/schema/basic-info";

export const getBasicInfos: () => Promise<
  z.infer<typeof BasicInfoSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionBasicInfoSchema>(
    config.notion.db.basicInfo,
  ).then((res) => res.map(translate));

export const getBasicInfo: (
  id: string,
) => Promise<z.infer<typeof BasicInfoSchema.base>> = (id) =>
  getPageById<typeof NotionBasicInfoSchema>(id).then(translate);

const translate = (res: z.infer<typeof NotionBasicInfoSchema>) => ({
  name: res.properties.Name.title[0].text.content,
  dateOfBirth: res.properties["Date of birth"].date.start,
  location: res.properties["Based in"].rich_text[0].text.content,
  email: res.properties.Email.email,
  pictureUrl: res.properties.Avatar.files[0].name,
  coverUrl: res.properties.Cover.files[0].name,
  githubUrl: res.properties["Github link"].url,
  linkedinUrl: res.properties["LinkedIn link"].url,
});
