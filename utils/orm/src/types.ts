import z from "zod/v4";
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

export type DBTypeVGetByIdFnMap<
  DBTypes,
  TypeToFinalSchemaMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    itemId: string,
  ) => Promise<z.infer<TypeToFinalSchemaMap[DBType]>>;
};

export type DBTypeVGetAllFnMap<
  DBTypes,
  TypeToFinalSchemaMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: () => Promise<
    z.infer<TypeToFinalSchemaMap[DBType]>[]
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
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
  TvGBIFnMap extends DBTypeVGetByIdFnMap<DBTypes, TvFBSMap>,
  TvGAllFnMap extends DBTypeVGetAllFnMap<DBTypes, TvFBSMap>,
>(
  dbTypes: DBTypes,
  dbTypeVFinalBaseSchemaMap: TvFBSMap,
  dbTypeVFinalRelationsSchemaMap: TvFRSMap,
  dbTypeVGetByIdFnMap: TvGBIFnMap,
  dbTypeVGetAllFnMap: TvGAllFnMap,
  getRelatedData: <
    BaseDBType extends keyof DBTypes,
    FinalSchemaRelationKey extends keyof TvFRSMap[BaseDBType],
    RelatedDBType extends
      TvFRSMap[BaseDBType][FinalSchemaRelationKey]["dbType"],
  >(
    baseDbType: BaseDBType,
    objectId: string,
    finalSchemaRelationKey: FinalSchemaRelationKey,
  ) => { id: string }[] | Promise<{ id: string }[]>,
) => ORM<DBTypes, TvFBSMap, TvFRSMap>;
