import { SchemaDef, Schema } from "@abhishekchalla/schema/utils/schema";
import z from "zod";

type DBTypeVRawSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: z.ZodObject;
};

export type DBTypeVFinalSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: SchemaDef<DBTypes>;
};

type DBTypeVRawSchemaVFinalSchemaRelationsMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalSchemaMap extends DBTypeVFinalSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: {
    [FinalSchemaRelationName in keyof TypeToFinalSchemaMap[DBType]["relations"]]: keyof TypeToRawSchemaMap[DBType]["shape"]["properties"]["shape"] /* notion specific logic */;
  };
};

type DBTypeVTransformerMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalSchemaMap extends DBTypeVFinalSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    rawData: z.infer<TypeToRawSchemaMap[DBType]>,
  ) => z.infer<TypeToFinalSchemaMap[DBType]["base"]>;
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

export type RelationsResolverOpts<
  DBTypes,
  BaseDBType extends keyof DBTypes,
  TvFSMap extends DBTypeVFinalSchemaMap<DBTypes>,
> = {
  [RelationName in keyof TvFSMap[BaseDBType]["relations"]]: boolean;
  // RelationsResolverOpts<
  //   DBTypes,
  //   TvFSMap[BaseDBType]["relations"][RelationName]["dbType"],
  //   TvFSMap
  // >;
};

export type ORM<DBTypes, TvFSMap extends DBTypeVFinalSchemaMap<DBTypes>> = {
  [DBType in keyof DBTypes]: {
    getById: (
      id: string,
      relResOpts: RelationsResolverOpts<DBTypes, DBType, TvFSMap>,
    ) => Promise<Schema<DBTypes, TvFSMap, DBType>>;
    getAll: (
      relResOpts: RelationsResolverOpts<DBTypes, DBType, TvFSMap>,
    ) => Promise<Schema<DBTypes, TvFSMap, DBType>[]>;
  };
};

export type ORMGenerator = <
  DBTypes,
  TvRSMap extends DBTypeVRawSchemaMap<DBTypes>,
  TvFSMap extends DBTypeVFinalSchemaMap<DBTypes>,
  TvFSRMap extends DBTypeVRawSchemaVFinalSchemaRelationsMap<
    DBTypes,
    TvRSMap,
    TvFSMap
  >,
  TvTMap extends DBTypeVTransformerMap<DBTypes, TvRSMap, TvFSMap>,
  TvGRBIFnMap extends DBTypeVGetRawByIdFnMap<DBTypes, TvRSMap>,
  TvGRAllFnMap extends DBTypeVGetRawAllFnMap<DBTypes, TvRSMap>,
>(
  dbTypes: DBTypes,
  dbTypeVRawSchemaMap: TvRSMap,
  dbTypeVFinalSchemaMap: TvFSMap,
  dbTypeVFinalSchemaVRawSchemaRelationsMapping: TvFSRMap,
  dbTypeVTransformerMap: TvTMap,
  dbTypeVGetRawByIdFnMap: TvGRBIFnMap,
  dbTypeVGetRawAllFnMap: TvGRAllFnMap,
) => ORM<DBTypes, TvFSMap>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
