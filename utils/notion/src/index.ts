import { Client, QueryDataSourceResponse } from "@notionhq/client";
import * as config from "@abhishekchalla/config";
import { getDBRecords } from "@abhishekchalla/notion/db";
import z, { ZodType } from "zod";

export const notionClient = new Client({
  auth: config.notion.apiSecret,
});

export const getAllDbRecords = async <T extends z.ZodType>(
  dbId: string,
): Promise<z.infer<T>[]> => {
  let hasMore = true;
  let cursor: string | undefined = undefined;
  const pages: any[] = [];

  while (hasMore) {
    const dbResult = await getDBRecords(dbId);
    pages.push(...(await getDBResultPages(dbResult.results)));
    hasMore = dbResult.has_more;
    cursor = dbResult.next_cursor;
  }

  return pages as z.infer<T>[];
};

export const getDBResultPages = (
  dbResult: QueryDataSourceResponse["results"],
) => {
  return Promise.all(
    dbResult.map((page) =>
      notionClient.pages.retrieve({
        page_id: page.id,
      }),
    ),
  );
};

export const getPageById = <T extends ZodType>(
  pageId: string,
): Promise<z.infer<T>> => {
  return notionClient.pages.retrieve({
    page_id: pageId,
  }) as Promise<z.infer<T>>;
};
