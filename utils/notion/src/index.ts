import { notionClient } from "@abhishekchalla/notion/client";
import { getDBRecords } from "@abhishekchalla/notion/db";
import {
  PropertyItemListResponse,
  RelationPropertyItemObjectResponse,
} from "@notionhq/client";
import z from "zod/v4";

export const getAllDbRecords = async <T extends z.ZodObject>(
  dbId: string,
  pageSize: number = 100,
): Promise<z.infer<T>[]> => {
  let hasMore = true;
  let cursor: string | undefined = undefined;
  const pages: any[] = [];

  while (hasMore) {
    const dbResult = await getDBRecords(dbId, pageSize, cursor);
    pages.push(...dbResult.results);

    hasMore = dbResult.has_more;
    cursor = dbResult.next_cursor;
  }

  return pages as z.infer<T>[];
};

export const getPageById = <T extends z.ZodObject>(
  pageId: string,
): Promise<z.infer<T>> => {
  return notionClient.pages.retrieve({
    page_id: pageId,
  }) as Promise<z.infer<T>>;
};

export const getAllObjectRelations = async (
  pageId: string,
  propertyId: string,
  pageSize: number = 100,
) => {
  let hasMore = true;
  let cursor: string | undefined = undefined;
  const objects: { id: string }[] = [];

  while (hasMore) {
    const resultSet = await notionClient.pages.properties
      .retrieve({
        page_id: pageId,
        property_id: propertyId,
        page_size: pageSize,
        start_cursor: cursor,
      })
      .then((res: PropertyItemListResponse) => res);

    hasMore = resultSet.has_more;
    cursor = resultSet.next_cursor;

    objects.push(
      ...resultSet.results.map(
        (e) => (e as RelationPropertyItemObjectResponse).relation,
      ),
    );
  }

  return objects;
};

export { notionClient } from "@abhishekchalla/notion/client";
