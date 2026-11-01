import z from "zod";
import { IsMulti } from "@abhishekchalla/orm/consts";

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type DBTypeVFinalBaseSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: z.ZodObject;
};

export type DBTypeVFinalRelationsSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: {
    [relationName: string]: {
      dbType: keyof DBTypes;
      isMulti: IsMulti;
    };
  };
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

export type Schema<
  DBTypes,
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
  DBType extends keyof DBTypes,
  RelResOpts extends RelationsResolverOpts<DBTypes, DBType, TvFRSMap>,
> = z.infer<TvFBSMap[DBType]> & {
  [Relation in keyof RelResOpts &
    keyof TvFRSMap[DBType]]: TvFRSMap[DBType][Relation]["isMulti"] extends true
    ? Prettify<
        Schema<
          DBTypes,
          TvFBSMap,
          TvFRSMap,
          TvFRSMap[DBType][Relation]["dbType"],
          RelResOpts[Relation]
        >
      >[]
    : Prettify<
        Schema<
          DBTypes,
          TvFBSMap,
          TvFRSMap,
          TvFRSMap[DBType][Relation]["dbType"],
          RelResOpts[Relation]
        >
      >;
};

export type DBTypeVRawSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: z.ZodObject;
};

export type DBTypeVFinalSchemaMap<
  DBTypes,
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: Schema<DBTypes, TvFBSMap, TvFRSMap, DBType, any>;
};

export type DBTypeVRawSchemaVFinalSchemaRelationsMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalRelationsSchemaMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: {
    [FinalSchemaRelationName in keyof TypeToFinalRelationsSchemaMap[DBType]]: keyof TypeToRawSchemaMap[DBType]["shape"]["properties"]["shape"] /* notion specific logic */;
  };
};

export type DBTypeVTransformerMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalBaseSchemaMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    rawData: z.infer<TypeToRawSchemaMap[DBType]>,
  ) => z.infer<TypeToFinalBaseSchemaMap[DBType]>;
};

export type DBTypeVGetRawByIdFnMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    itemId: string,
  ) => Promise<z.infer<TypeToRawSchemaMap[DBType]>>;
};

export type DBTypeVGetRawAllFnMap<
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
  TvTMap extends DBTypeVTransformerMap<DBTypes, TvRSMap, TvFBSMap>,
  TvGRBIFnMap extends DBTypeVGetRawByIdFnMap<DBTypes, TvRSMap>,
  TvGRAllFnMap extends DBTypeVGetRawAllFnMap<DBTypes, TvRSMap>,
>(
  dbTypes: DBTypes,
  dbTypeVRawSchemaMap: TvRSMap,
  dbTypeVFinalBaseSchemaMap: TvFBSMap,
  dbTypeVFinalRelationsSchemaMap: TvFRSMap,
  dbTypeVTransformerMap: TvTMap,
  dbTypeVGetRawByIdFnMap: TvGRBIFnMap,
  dbTypeVGetRawAllFnMap: TvGRAllFnMap,
  getRelatedData: <
    DBType extends keyof DBTypes,
    FinalSchemaRelationKey extends keyof TvFRSMap[DBType],
  >(
    dbType: DBType,
    finalSchemaRelationKey: FinalSchemaRelationKey,
  ) => z.infer<TvFBSMap[TvFRSMap[DBType][FinalSchemaRelationKey]["dbType"]]>[],
) => ORM<DBTypes, TvFBSMap, TvFRSMap>;
