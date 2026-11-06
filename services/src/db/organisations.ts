import * as config from "@abhishekchalla/config";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import { NotionOrganisationSchema } from "@abhishekchalla/schema/notion/organisation";
import { OrganisationSchema } from "@abhishekchalla/schema/organisation";
import z from "zod/v4";

export const getOrganisations: () => Promise<
  z.infer<typeof OrganisationSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionOrganisationSchema>(
    config.notion.db.organisations,
  ).then((res) => res.map(translate));

export const getOrganisation: (
  organisationId: string,
) => Promise<z.infer<typeof OrganisationSchema.base>> = (organisationId) =>
  getPageById<typeof NotionOrganisationSchema>(organisationId).then(translate);

const translate = (res: z.infer<typeof NotionOrganisationSchema>) => ({
  id: res.id,
  name: res.properties.Name.title[0].text.content,
  logoUrl: res.properties.Thumbnail.files[0].name,
  description: res.properties.Description,
});
