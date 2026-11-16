import * as config from "@abhishekchalla/config";
import { notionClient } from "@abhishekchalla/notion/client";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import { finalSchemaVRawSchemaRelationsMapping } from "@abhishekchalla/schema/index";
import { DB_TYPE_TO_DB_CONFIG_KEY_MAP } from "@abhishekchalla/services/get-notion-data/consts";
import _set from "lodash/set";

export const getRelationPropertiesInfo = async () => {
  const relationPropertiesInfo: {
    [DBType in keyof typeof DB_TYPES]?: {
      [FSRelationKey in keyof (typeof finalSchemaVRawSchemaRelationsMapping)[DBType]]: string;
    };
  } = {};

  for (const dbType in finalSchemaVRawSchemaRelationsMapping) {
    const dbConfigKey =
      DB_TYPE_TO_DB_CONFIG_KEY_MAP[
        dbType as keyof typeof finalSchemaVRawSchemaRelationsMapping
      ];
    const dbDsId = config.notion.db[dbConfigKey];
    if (!dbDsId) throw new Error("Data Source ID not found for DB: " + dbType);

    const dsInfo = await notionClient.dataSources.retrieve({
      data_source_id: dbDsId,
    });

    const finalSchemaRelationKeyMapping =
      finalSchemaVRawSchemaRelationsMapping[
        dbType as keyof typeof finalSchemaVRawSchemaRelationsMapping
      ];

    for (const rawPropKey in dsInfo.properties) {
      for (const fsRelationKey in finalSchemaRelationKeyMapping)
        if (
          finalSchemaRelationKeyMapping[
            fsRelationKey as keyof typeof finalSchemaRelationKeyMapping
          ] === rawPropKey
        )
          _set(
            relationPropertiesInfo,
            `${dbType}.${fsRelationKey}`,
            dsInfo.properties[rawPropKey].id,
          );
    }
  }

  return relationPropertiesInfo;
};
