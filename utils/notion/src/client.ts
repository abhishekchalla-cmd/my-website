import { Client } from "@notionhq/client";
import { NotionAPI } from "notion-client";

if (!process.env.NOTION_API_SECRET)
  throw new Error("Notion API secret not found");

export const notionClient = new Client({
  auth: process.env.NOTION_API_SECRET,
});

if (!process.env.NOTION_X_TOKEN_V2 || !process.env.NOTION_X_ACTIVE_USER)
  throw new Error("Notion Token or Active User not found");

export const notionXClient = new NotionAPI({
  authToken: process.env.NOTION_X_TOKEN_V2,
  activeUser: process.env.NOTION_X_ACTIVE_USER,
});
