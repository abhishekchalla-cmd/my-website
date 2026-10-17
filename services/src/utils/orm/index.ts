import z from "zod";
import { ORM, ORMGenerator } from "./types";
import { NotionRelationPropertySchema } from "@abhishekchalla/schema/notion/properties";

export const generateOrm: ORMGenerator = (
  dbTypes,
  dbTypeVRawSchemaMap,
  dbTypeVFinalSchemaMap,
  dbTypeVFinalSchemaVRawSchemaRelationsMapping,
  dbTypeVTransformerMap,
  dbTypeVGetRawByIdFnMap,
  dbTypeVGetRawAllFnMap,
) => {
  const orm = Object.values(dbTypes).reduce(
    (acc, dbType) => ({
      ...acc,
      [dbType]: {
        getById: async (id, relResOpts) =>
          dbTypeVGetRawByIdFnMap[dbType](id).then(async (res) => {
            const transformedRes = dbTypeVTransformerMap[dbType](res);

            if (!relResOpts) return transformedRes;

            // Fetch related fields data
            for (const finalSchemaRelationKey of Object.keys(
              dbTypeVFinalSchemaVRawSchemaRelationsMapping[dbType],
            )) {
              const rawSchemaRelationKey =
                dbTypeVFinalSchemaVRawSchemaRelationsMapping[dbType][
                  finalSchemaRelationKey
                ];
              const relatedDataRaw: z.infer<
                typeof NotionRelationPropertySchema
              > =
                res.properties[
                  rawSchemaRelationKey
                ]; /* notion specific logic */

              const finalData = dbTypeVFinalSchemaMap[dbType].relations[
                finalSchemaRelationKey
              ].isMulti
                ? await Promise.all(
                    relatedDataRaw.relation.map(({ id }) =>
                      orm[dbType].getById(
                        id,
                        relResOpts[finalSchemaRelationKey],
                      ),
                    ),
                  )
                : await orm[dbType].getById(
                    relatedDataRaw.relation[0].id,
                    relResOpts[finalSchemaRelationKey],
                  );

              transformedRes[finalSchemaRelationKey] = finalData;
            }

            return transformedRes;
          }),
        getAll: async (relResOpts) => {
          const allRawData = await dbTypeVGetRawAllFnMap[dbType]();
          return allRawData;
        },
      },
    }),
    {},
  ) as ORM<typeof dbTypes, typeof dbTypeVFinalSchemaMap>;

  return orm;
};
