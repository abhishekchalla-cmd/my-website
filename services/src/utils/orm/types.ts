import {
  Schema,
  DBTypeVFinalBaseSchemaMap,
  DBTypeVFinalRelationsSchemaMap,
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
  [DBType in keyof DBTypes]: Schema<DBTypes, TvFBSMap, TvFRSMap, DBType>;
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
  TypeToFinalRelationsSchemaMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    itemId: string,
    relResOpts: RelationsResolverOpts<
      DBTypes,
      DBType,
      TypeToFinalRelationsSchemaMap
    >,
  ) => Promise<z.infer<TypeToRawSchemaMap[DBType]>>;
};

type DBTypeVGetRawAllFnMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalRelationsSchemaMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    relResOpts: RelationsResolverOpts<
      DBTypes,
      DBType,
      TypeToFinalRelationsSchemaMap
    >,
  ) => Promise<z.infer<TypeToRawSchemaMap[DBType]>[]>;
};

export type RelationsResolverOpts<
  DBTypes,
  BaseDBType extends keyof DBTypes,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [RelationName in keyof TvFRSMap[BaseDBType]]?:
    | boolean
    | RelationsResolverOpts<
        DBTypes,
        TvFRSMap[BaseDBType][RelationName]["dbType"],
        TvFRSMap
      >;
};

export type ORM<
  DBTypes,
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: {
    getById: (
      id: string,
      relResOpts: RelationsResolverOpts<DBTypes, DBType, TvFRSMap>,
    ) => Promise<Schema<DBTypes, TvFBSMap, TvFRSMap, DBType>>;
    getAll: (
      relResOpts: RelationsResolverOpts<DBTypes, DBType, TvFRSMap>,
    ) => Promise<Schema<DBTypes, TvFBSMap, TvFRSMap, DBType>[]>;
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
  TvGRBIFnMap extends DBTypeVGetRawByIdFnMap<DBTypes, TvRSMap, TvFRSMap>,
  TvGRAllFnMap extends DBTypeVGetRawAllFnMap<DBTypes, TvRSMap, TvFRSMap>,
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
