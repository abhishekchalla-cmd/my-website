import { z } from "zod";

// Base property schema
const NotionPropertyBaseSchema = z.object({
  id: z.string(),
});

// User object (simplified for properties)
export const NotionUserSchema = z.object({
  object: z.literal("user"),
  id: z.uuid(),
  name: z.string().optional(),
  avatar_url: z.string().nullable().optional(),
  type: z.string().optional(),
  person: z.object({ email: z.string().optional() }).optional(),
});

// File object (used in Files and Cover property)
export const NotionFileObjectSchema = z.union([
  z.object({
    type: z.literal("external"),
    name: z.string().optional(),
    external: z.object({ url: z.string() }),
  }),
  z.object({
    type: z.literal("file"),
    name: z.string().optional(),
    file: z.object({ url: z.string(), expiry_time: z.string() }),
  }),
]);

// Rich Text Object
export const NotionRichTextItemSchema = z.object({
  type: z.literal("text"),
  text: z.object({
    content: z.string(),
    link: z.object({ url: z.string() }).nullable(),
  }),
  annotations: z.object({
    bold: z.boolean(),
    italic: z.boolean(),
    strikethrough: z.boolean(),
    underline: z.boolean(),
    code: z.boolean(),
    color: z.string(),
  }),
  plain_text: z.string(),
  href: z.string().nullable(),
});

// Property Schemas

export const NotionRelationPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("relation"),
  relation: z.array(z.object({ id: z.string() })),
  has_more: z.boolean().optional(),
});

export const NotionFormulaPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("formula"),
  formula: z.union([
    z.object({
      type: z.literal("string"),
      string: z.string().nullable(),
    }),
    z.object({
      type: z.literal("number"),
      number: z.number().nullable(),
    }),
    z.object({
      type: z.literal("boolean"),
      boolean: z.boolean().nullable(),
    }),
    z.object({
      type: z.literal("date"),
      date: z.any().nullable(), // Date object structure similar to Date property
    }),
  ]),
});

export const NotionSelectOptionSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const NotionSelectPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("select"),
  select: NotionSelectOptionSchema.nullable(),
});

export const NotionMultiSelectPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("multi_select"),
  multi_select: z.array(NotionSelectOptionSchema),
});

export const NotionRichTextPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("rich_text"),
  rich_text: z.array(NotionRichTextItemSchema),
});

export const NotionDatePropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("date"),
  date: z
    .object({
      start: z.string(),
      end: z.string().nullable(),
      time_zone: z.string().nullable(),
    })
    .nullable(),
});

export const NotionFilesPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("files"),
  files: z.array(NotionFileObjectSchema),
});

export const NotionNumberPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("number"),
  number: z.number().nullable(),
});

export const NotionTitlePropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("title"),
  title: z.array(NotionRichTextItemSchema),
});

export const NotionPeoplePropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("people"),
  people: z.array(NotionUserSchema),
});

export const NotionCheckboxPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("checkbox"),
  checkbox: z.boolean(),
});

export const NotionUrlPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("url"),
  url: z.string().nullable(),
});

export const NotionEmailPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("email"),
  email: z.string().nullable(),
});

export const NotionPhoneNumberPropertySchema = NotionPropertyBaseSchema.extend({
  type: z.literal("phone_number"),
  phone_number: z.string().nullable(),
});
