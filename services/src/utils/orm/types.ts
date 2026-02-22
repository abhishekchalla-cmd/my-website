import z from "zod";

type DBTypeVSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: z.ZodObject | z.ZodDiscriminatedUnion;
};

type DBTypeVRawSchemaRelationsMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: {
    [RawSchemaRelationName in keyof (TypeToRawSchemaMap[DBType] extends z.ZodObject
      ? TypeToRawSchemaMap[DBType]["shape"]["properties"]["shape"]
      : {})]?: keyof DBTypes;
  };
};

type DBTypeVFinalSchemaVRawSchemaRelationsMapping<
  DBTypes,
  TvFSMap extends DBTypeVSchemaMap<DBTypes>,
  TvRSMap extends DBTypeVSchemaMap<DBTypes>,
  TvRSRMap extends DBTypeVRawSchemaRelationsMap<DBTypes, TvRSMap>,
> = {
  [DBType in keyof DBTypes]: {
    [RawSchemaRelationName in KeysOfUnion<
      z.infer<TvFSMap[DBType]>
    >]?: keyof TvRSRMap[DBType];
  };
};

type DBTypeVTransformerMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVSchemaMap<DBTypes>,
  TypeToFinalSchemaMap extends DBTypeVSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    rawData: z.infer<TypeToRawSchemaMap[DBType]>,
  ) => z.infer<TypeToFinalSchemaMap[DBType]>;
};

type DBTypeVGetRawByIdFnMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: (
    itemId: string,
  ) => Promise<z.infer<TypeToRawSchemaMap[DBType]>>;
};

type DBTypeVGetRawAllFnMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: () => Promise<
    z.infer<TypeToRawSchemaMap[DBType]>[]
  >;
};

export type ORMGenerator = <
  DBTypes,
  TvRSMap extends DBTypeVSchemaMap<DBTypes>,
  TvRSRMap extends DBTypeVRawSchemaRelationsMap<DBTypes, TvRSMap>,
  TvFSMap extends DBTypeVSchemaMap<DBTypes>,
  TvFSRMap extends DBTypeVFinalSchemaVRawSchemaRelationsMapping<
    DBTypes,
    TvFSMap,
    TvRSMap,
    TvRSRMap
  >,
  TvTMap extends DBTypeVTransformerMap<DBTypes, TvRSMap, TvFSMap>,
  TvGRBIFnMap extends DBTypeVGetRawByIdFnMap<DBTypes, TvRSMap>,
  TvGRAllFnMap extends DBTypeVGetRawAllFnMap<DBTypes, TvRSMap>,
>(
  dbTypes: DBTypes,
  dbTypeVRawSchemaMap: TvRSMap,
  dbTypeVRawSchemaRelationsMap: TvRSRMap,
  dbTypeVFinalSchemaMap: TvFSMap,
  dbTypeVFinalSchemaVRawSchemaRelationsMapping: TvFSRMap,
  dbTypeVTransformerMap: TvTMap,
  dbTypeVGetRawByIdFnMap: TvGRBIFnMap,
  dbTypeVGetRawAllFnMap: TvGRAllFnMap,
) => {
  [DBType in keyof DBTypes]: {
    getById: (id: string) => Promise<z.infer<TvFSMap[DBType]>>;
    getAll: () => Promise<z.infer<TvFSMap[DBType]>[]>;
  };
};

type KeysOfUnion<T> = T extends T ? keyof T : never;
