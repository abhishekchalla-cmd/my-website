import { notionClient } from "@abhishekchalla/services/utils/notion-client";

export const getDBRecords = async (dbId: string) => {
  const response = await notionClient.dataSources.query({
    data_source_id: dbId,
  });

  return response;
};
