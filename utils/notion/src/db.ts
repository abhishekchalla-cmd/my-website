import { notionClient } from "@abhishekchalla/notion/client";

export const getDBRecords = async (
  dbId: string,
  page_size?: number,
  start_cursor?: string,
) => {
  const response = await notionClient.dataSources.query({
    data_source_id: dbId,
    ...(page_size ? { page_size } : {}),
    ...(start_cursor ? { start_cursor } : {}),
  });

  return response;
};
