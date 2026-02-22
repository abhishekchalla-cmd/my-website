import { getAllDbRecords } from "@abhishekchalla/services/notion";
import * as config from "@abhishekchalla/config";
import { NotionBasicInfoSchema } from "@abhishekchalla/schema/notion/pages/basic-info";
import { getPageById } from "../notion/pages";

export const getBasicInfos = () =>
  getAllDbRecords<typeof NotionBasicInfoSchema>(config.notion.db.basicInfo);

export const getBasicInfo = (id: string) =>
  getPageById<typeof NotionBasicInfoSchema>(id);
