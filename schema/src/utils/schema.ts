import z from "zod";

export type DBTypeVFinalBaseSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: z.ZodObject;
};

export type DBTypeVFinalRelationsSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: {
    [relationName: string]: {
      dbType: keyof DBTypes;
      isMulti: boolean;
    };
  };
};

export type Schema<
  DBTypes,
  TvFBSMap extends DBTypeVFinalBaseSchemaMap<DBTypes>,
  TvFRSMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
  DBType extends keyof DBTypes,
> = z.infer<TvFBSMap[DBType]> & {
  [Relation in keyof TvFRSMap[DBType]]?: TvFRSMap[DBType][Relation]["isMulti"] extends true
    ? Schema<
        DBTypes,
        TvFBSMap,
        TvFRSMap,
        TvFRSMap[DBType][Relation]["dbType"]
      >[]
    : Schema<DBTypes, TvFBSMap, TvFRSMap, TvFRSMap[DBType][Relation]["dbType"]>;
};
