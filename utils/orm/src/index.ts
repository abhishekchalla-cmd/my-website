import z from "zod/v4";
import {
  ORM,
  ORMGenerator,
  RelationsResolverOpts,
} from "@abhishekchalla/orm/types";

export const generateOrm: ORMGenerator = (
  dbTypes,
  dbTypeVFinalBaseSchemaMap,
  dbTypeVFinalRelationsSchemaMap,
  dbTypeVGetByIdFnMap,
  dbTypeVGetAllFnMap,
  getRelatedData,
) => {
  const getDownstreamData = async <
    DBType extends keyof typeof dbTypes,
    RelResOpts extends RelationsResolverOpts<
      typeof dbTypes,
      DBType,
      typeof dbTypeVFinalRelationsSchemaMap
    >,
  >(
    obj: z.infer<(typeof dbTypeVFinalBaseSchemaMap)[DBType]>,
    dbType: DBType,
    relResOpts: RelResOpts,
  ) => {
    // console.log("Getting downstream data", dbType);

    // Fetch related fields data
    const relationsData = {};

    for (const finalSchemaRelationKey of Object.keys(
      dbTypeVFinalRelationsSchemaMap[dbType],
    ).filter(
      // Include ones that exist in relResOpts
      (finalSchemaKey) => !!relResOpts[finalSchemaKey],
    )) {
      // console.log("Getting DS Data for key: ", finalSchemaRelationKey);

      const completeRelatedData = await getRelatedData(
        dbType,
        obj.id as any,
        finalSchemaRelationKey,
      );
      // console.log("Got complete related data: id list");

      const relationDBType =
        dbTypeVFinalRelationsSchemaMap[dbType][finalSchemaRelationKey].dbType;
      const finalData = dbTypeVFinalRelationsSchemaMap[dbType][
        finalSchemaRelationKey
      ].isMulti
        ? await Promise.all(
            completeRelatedData.map((relObj) =>
              orm[relationDBType].getById(
                relObj.id,
                relResOpts[finalSchemaRelationKey] as any,
              ),
            ),
          )
        : await orm[relationDBType].getById(
            completeRelatedData[0].id,
            relResOpts[finalSchemaRelationKey] as any,
          );

      // console.log("Materialised data");

      relationsData[finalSchemaRelationKey] = finalData;
    }

    return { ...obj, ...relationsData };
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
          // console.log("GetById ", dbType, id);

          const res = await dbTypeVGetByIdFnMap[dbType](id, relResOpts);
          // console.log("Fetched data");

          const downstreamData = await getDownstreamData(
            res,
            dbType,
            relResOpts,
          );
          // console.log("Got downstream data");

          return { ...res, ...downstreamData };
        },
        getAll: async (
          relResOpts: RelationsResolverOpts<
            typeof dbTypes,
            typeof dbType,
            typeof dbTypeVFinalRelationsSchemaMap
          >,
        ) => {
          // console.log("Get All", dbType);

          const allRawData = await dbTypeVGetAllFnMap[dbType](relResOpts);
          // console.log("Got data");

          const allData = await Promise.all(
            allRawData.map(async (res) => {
              const downstreamData = await getDownstreamData(
                res,
                dbType,
                relResOpts,
              );

              return { ...res, ...downstreamData };
            }),
          );
          // console.log("Got downstream data");

          return allData;
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
