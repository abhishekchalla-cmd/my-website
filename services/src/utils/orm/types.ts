import {
  Schema,
  DBTypeVFinalBaseSchemaMap,
  DBTypeVFinalRelationsSchemaMap,
  RelationsResolverOpts,
  Prettify,
} from "@abhishekchalla/schema/utils/schema";
import z from "zod";

type DBTypeVRawSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: z.ZodObject;
};

export type DBTypeVFinalSchemaMap<
  DBTypes,
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: Schema<DBTypes, TvFBSMap, TvFRSMap, DBType, any>;
};

type DBTypeVRawSchemaVFinalSchemaRelationsMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalRelationsSchemaMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: {
    [FinalSchemaRelationName in keyof TypeToFinalRelationsSchemaMap[DBType]]: keyof TypeToRawSchemaMap[DBType]["shape"]["properties"]["shape"] /* notion specific logic */;
  };
};

type DBTypeVTransformerMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalBaseSchemaMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    rawData: z.infer<TypeToRawSchemaMap[DBType]>,
  ) => z.infer<TypeToFinalBaseSchemaMap[DBType]>;
};

type DBTypeVGetRawByIdFnMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    itemId: string,
  ) => Promise<z.infer<TypeToRawSchemaMap[DBType]>>;
};

type DBTypeVGetRawAllFnMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: () => Promise<
    z.infer<TypeToRawSchemaMap[DBType]>[]
  >;
};

export type ORM<
  DBTypes,
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: {
    getById: <
      RelResOpts extends RelationsResolverOpts<DBTypes, DBType, TvFRSMap>,
    >(
      id: string,
      relResOpts: RelResOpts,
    ) => Promise<
      Prettify<Schema<DBTypes, TvFBSMap, TvFRSMap, DBType, RelResOpts>>
    >;
    getAll: <
      RelResOpts extends RelationsResolverOpts<DBTypes, DBType, TvFRSMap>,
    >(
      relResOpts: RelResOpts,
    ) => Promise<
      Prettify<Schema<DBTypes, TvFBSMap, TvFRSMap, DBType, RelResOpts>>[]
    >;
  };
};

export type ORMGenerator = <
  DBTypes,
  TvRSMap extends DBTypeVRawSchemaMap<DBTypes>,
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
  TvFSRMap extends DBTypeVRawSchemaVFinalSchemaRelationsMap<
    DBTypes,
    TvRSMap,
    TvFRSMap
  >,
  TvTMap extends DBTypeVTransformerMap<DBTypes, TvRSMap, TvFBSMap>,
  TvGRBIFnMap extends DBTypeVGetRawByIdFnMap<DBTypes, TvRSMap>,
  TvGRAllFnMap extends DBTypeVGetRawAllFnMap<DBTypes, TvRSMap>,
>(
  dbTypes: DBTypes,
  dbTypeVRawSchemaMap: TvRSMap,
  dbTypeVFinalBaseSchemaMap: TvFBSMap,
  dbTypeVFinalRelationsSchemaMap: TvFRSMap,
  dbTypeVFinalSchemaVRawSchemaRelationsMapping: TvFSRMap,
  dbTypeVTransformerMap: TvTMap,
  dbTypeVGetRawByIdFnMap: TvGRBIFnMap,
  dbTypeVGetRawAllFnMap: TvGRAllFnMap,
) => ORM<DBTypes, TvFBSMap, TvFRSMap>;
