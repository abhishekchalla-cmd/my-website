import z from "zod";
import { IsMulti } from "./consts";

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
