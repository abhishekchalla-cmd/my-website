import { notionClient } from "@abhishekchalla/services/utils/notion-client";
import { QueryDataSourceResponse } from "@notionhq/client";
import z, { ZodType } from "zod";

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
