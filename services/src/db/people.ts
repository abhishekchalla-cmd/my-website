import * as config from "@abhishekchalla/config";
import { NotionPersonSchema } from "@abhishekchalla/schema/notion/person";
import { getAllDbRecords, getPageById } from "@abhishekchalla/notion";
import { PersonSchema } from "@abhishekchalla/schema/person";
import z from "zod/v4";

export const getPeople: () => Promise<
  z.infer<typeof PersonSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionPersonSchema>(config.notion.db.people).then(
    (res) => res.map(translate),
  );

export const getPerson: (
  id: string,
) => Promise<z.infer<typeof PersonSchema.base>> = (id) =>
  getPageById<typeof NotionPersonSchema>(id).then(translate);

const translate: (
  res: z.infer<typeof NotionPersonSchema>,
) => z.infer<typeof PersonSchema.base> = (res) => ({
  id: res.id,
  name: res.properties.Name.title[0]?.text.content,
  linkedinUrl: res.properties["LinkedIn link"]?.url,
});
