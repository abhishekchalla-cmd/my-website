import z from "zod";
import { ORMGenerator } from "./types";

export const generateOrm: ORMGenerator = (
  dbTypes,
  dbTypeVRawSchemaMap,
  dbTypeVRawSchemaRelationsMap,
  dbTypeVFinalSchemaMap,
  dbTypeVTransformerMap,
  dbTypeVGetRawByIdFnMap,
  dbTypeVGetRawAllFnMap,
) => {
  return Object.keys(dbTypes).reduce(
    (acc, dbTypeName) => ({
      ...acc,
      [dbTypeName]: {
        getById: (id) =>
          dbTypeVGetRawByIdFnMap[dbTypeName](id).then(
            dbTypeVTransformerMap[dbTypeName],
          ),
        getAll: () =>
          dbTypeVGetRawAllFnMap[dbTypeName]().then((rawAllData) =>
            rawAllData.map(dbTypeVTransformerMap[dbTypeName]),
          ),
      },
    }),
    {},
  ) as {
    [DBType in keyof typeof dbTypes]: {
      getById: (
        id: string,
      ) => Promise<z.infer<(typeof dbTypeVFinalSchemaMap)[DBType]>>;
      getAll: () => Promise<z.infer<(typeof dbTypeVFinalSchemaMap)[DBType]>[]>;
    };
  };
};
