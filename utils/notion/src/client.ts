import { Client } from "@notionhq/client";
import * as config from "@abhishekchalla/config";

export const notionClient = new Client({
  auth: config.notion.apiSecret,
});
