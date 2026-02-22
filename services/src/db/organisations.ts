import * as config from "@abhishekchalla/config";
import { getAllDbRecords } from "@abhishekchalla/services/notion";
import { getPageById } from "../notion/pages";
import { NotionOrganisationSchema } from "@abhishekchalla/schema/notion/pages/organisation";

export const getOrganisations = () =>
  getAllDbRecords<typeof NotionOrganisationSchema>(
    config.notion.db.organisations,
  );

export const getOrganisation = (organisationId: string) =>
  getPageById<typeof NotionOrganisationSchema>(organisationId);
