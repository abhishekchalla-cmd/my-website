import * as config from "@abhishekchalla/config";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import { NotionOrganisationSchema } from "@abhishekchalla/schema/notion/organisation";

export const getOrganisations = () =>
  getAllDbRecords<typeof NotionOrganisationSchema>(
    config.notion.db.organisations,
  );

export const getOrganisation = (organisationId: string) =>
  getPageById<typeof NotionOrganisationSchema>(organisationId);
