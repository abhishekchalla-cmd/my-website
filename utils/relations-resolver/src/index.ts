import z from "zod";

export type RawSchemaToResolvedSchemaMap<TypeDict> = {
  [TypeName in Extract<keyof TypeDict, string>]: {
    rawSchema: z.ZodObject;
    desiredSchema: SchemaType<TypeDict, TypeName, any>;
  };
};

export type SchemaType<
  TypeKeyDict,
  TypeName extends Extract<keyof TypeKeyDict, string>,
  ZObj extends z.ZodObject<any>,
> = z.ZodObject<{ __typename: z.ZodLiteral<TypeName> } & ZObj["shape"]>;
