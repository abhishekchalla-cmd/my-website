import z from "zod";

export type SchemaDef<DBTypes> = {
  base: z.ZodObject;
  relations: {
    [relationName: string]: {
      dbType: keyof DBTypes;
      isMulti: boolean;
    };
  };
};

export type Schema<
  DBTypes,
  DBTypesSchemaDefMap extends { [DBT in keyof DBTypes]: SchemaDef<DBTypes> },
  DBType extends keyof DBTypes,
> = z.infer<DBTypesSchemaDefMap[DBType]["base"]> & {
  [Relation in keyof DBTypesSchemaDefMap[DBType]["relations"]]?: DBTypesSchemaDefMap[DBType]["relations"][Relation]["isMulti"] extends true
    ? Schema<
        DBTypes,
        DBTypesSchemaDefMap,
        DBTypesSchemaDefMap[DBType]["relations"][Relation]["dbType"]
      >[]
    : Schema<
        DBTypes,
        DBTypesSchemaDefMap,
        DBTypesSchemaDefMap[DBType]["relations"][Relation]["dbType"]
      >;
};
