import { notionClient } from "@abhishekchalla/notion";

export const getDBRecords = async (dbId: string) => {
  const response = await notionClient.dataSources.query({
    data_source_id: dbId,
  });

  return response;
};
