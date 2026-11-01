import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import * as config from "@abhishekchalla/config";
import { NotionBasicInfoSchema } from "@abhishekchalla/schema/notion/basic-info";

export const getBasicInfos = () =>
  getAllDbRecords<typeof NotionBasicInfoSchema>(config.notion.db.basicInfo);

export const getBasicInfo = (id: string) =>
  getPageById<typeof NotionBasicInfoSchema>(id);
