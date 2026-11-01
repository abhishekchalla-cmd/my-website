import z from "zod";
import {
  ORM,
  ORMGenerator,
  RelationsResolverOpts,
} from "@abhishekchalla/orm/types";

export const generateOrm: ORMGenerator = (
  dbTypes,
  dbTypeVRawSchemaMap,
  dbTypeVFinalBaseSchemaMap,
  dbTypeVFinalRelationsSchemaMap,
  dbTypeVTransformerMap,
  dbTypeVGetRawByIdFnMap,
  dbTypeVGetRawAllFnMap,
  getRelatedData,
) => {
  const formatAndGetDownstreamData = async <
    DBType extends keyof typeof dbTypes,
    RelResOpts extends RelationsResolverOpts<
      typeof dbTypes,
      DBType,
      typeof dbTypeVFinalRelationsSchemaMap
    >,
  >(
    obj: z.infer<(typeof dbTypeVRawSchemaMap)[DBType]>,
    dbType: DBType,
    relResOpts: RelResOpts,
  ) => {
    // Fetch related fields data
    const relationsData = {};

    for (const finalSchemaRelationKey of Object.keys(
      dbTypeVFinalRelationsSchemaMap[dbType],
    ).filter(
      // Include ones that exist in relResOpts
      (finalSchemaKey) => !!relResOpts[finalSchemaKey],
    )) {
      const completeRelatedData = getRelatedData(
        dbType,
        finalSchemaRelationKey,
      );

      const finalData = dbTypeVFinalRelationsSchemaMap[dbType][
        finalSchemaRelationKey
      ].isMulti
        ? await Promise.all(
            completeRelatedData.map((relObj) =>
              orm[dbType].getById(
                (relObj as any).id,
                relResOpts[finalSchemaRelationKey] as any,
              ),
            ),
          )
        : await orm[dbType].getById(
            (completeRelatedData[0] as any).id,
            relResOpts[finalSchemaRelationKey] as any,
          );

      relationsData[finalSchemaRelationKey] = finalData;
    }

    const transformedObj = dbTypeVTransformerMap[dbType](obj);

    return { ...transformedObj, ...relationsData };
  };

  const orm = Object.values(dbTypes).reduce(
    (acc, dbType) => ({
      ...acc,
      [dbType]: {
        getById: async (
          id: string,
          relResOpts: RelationsResolverOpts<
            typeof dbTypes,
            typeof dbType,
            typeof dbTypeVFinalRelationsSchemaMap
          > = {},
        ) => {
          let res = await dbTypeVGetRawByIdFnMap[dbType](id, relResOpts);
          return formatAndGetDownstreamData(res, dbType, relResOpts);
        },
        getAll: async (
          relResOpts: RelationsResolverOpts<
            typeof dbTypes,
            typeof dbType,
            typeof dbTypeVFinalRelationsSchemaMap
          >,
        ) => {
          const allRawData = await dbTypeVGetRawAllFnMap[dbType](relResOpts);
          return Promise.all(
            allRawData.map((res) =>
              formatAndGetDownstreamData(res, dbType, relResOpts),
            ),
          );
        },
      },
    }),
    {},
  ) as ORM<
    typeof dbTypes,
    typeof dbTypeVFinalBaseSchemaMap,
    typeof dbTypeVFinalRelationsSchemaMap
  >;

  return orm;
};
