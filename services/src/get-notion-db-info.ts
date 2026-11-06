import * as config from "@abhishekchalla/config";
import { notionClient } from "@abhishekchalla/notion/client";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import { finalSchemaVRawSchemaRelationsMapping } from "@abhishekchalla/schema/index";
import { writeFileSync } from "node:fs";
import _set from "lodash/set";
import { resolve } from "node:path";

const DB_TYPE_TO_DB_CONFIG_KEY_MAP: {
  [DBType in keyof typeof DB_TYPES]: keyof typeof config.notion.db;
} = {
  basicInfo: "basicInfo",
  experience: "experience",
  skill: "skills",
  testimony: "testimonies",
  organisation: "organisations",
  person: "people",
  projectClientRelation: "projectClientRelation",
  projectPeopleRelation: "projectPeopleRelation",
  project: "projects",
};

const getRelationPropertiesInfo = async () => {
  const relationPropertiesInfo: {
    [DBType in keyof typeof DB_TYPES]?: {
      [FSRelationKey in keyof (typeof finalSchemaVRawSchemaRelationsMapping)[DBType]]: string;
    };
  } = {};

  for (const dbType in finalSchemaVRawSchemaRelationsMapping) {
    const dbConfigKey = DB_TYPE_TO_DB_CONFIG_KEY_MAP[dbType];
    const dbDsId = config.notion.db[dbConfigKey];
    const dsInfo = await notionClient.dataSources.retrieve({
      data_source_id: dbDsId,
    });

    const finalSchemaRelationKeyMapping =
      finalSchemaVRawSchemaRelationsMapping[dbType];

    for (const rawPropKey in dsInfo.properties) {
      for (const fsRelationKey in finalSchemaRelationKeyMapping)
        if (finalSchemaRelationKeyMapping[fsRelationKey] === rawPropKey)
          _set(
            relationPropertiesInfo,
            `${dbType}.${fsRelationKey}`,
            dsInfo.properties[rawPropKey].id,
          );
    }
  }

  return relationPropertiesInfo;
};

export const getNotionDbInfo = async () => {
  const relationPropertiesInfo = await getRelationPropertiesInfo();

  writeFileSync(
    resolve(__dirname, "./notion-db-info.json"),
    JSON.stringify(
      {
        relationPropertiesInfo,
      },
      null,
      2,
    ),
  );
};

if (require.main.filename === __filename)
  getNotionDbInfo().catch(console.error);
