import { z } from "zod";

export const NotionPageBaseSchema = z.object({
  object: z.literal("page"),
  id: z.uuid(),
  created_time: z.iso.datetime(),
  last_edited_time: z.iso.datetime(),
  created_by: z.object({
    object: z.literal("user"),
    id: z.uuid(),
  }),
  last_edited_by: z.object({
    object: z.literal("user"),
    id: z.uuid(),
  }),
  cover: z.union([
    z.object({
      type: z.literal("external"),
      external: z.object({ url: z.url() }),
    }),
    z.object({
      type: z.literal("file"),
      file: z.object({ url: z.url(), expiry_time: z.iso.datetime() }),
    }),
    z.null(),
  ]),
  icon: z.any().nullable(), // Can be emoji or file
  parent: z.object({
    type: z.string(),
    database_id: z.uuid().optional(),
    page_id: z.uuid().optional(),
    workspace: z.boolean().optional(),
  }),
  archived: z.boolean(),
  properties: z.record(z.string(), z.any()), // Dynamic properties
  url: z.url(),
  public_url: z.url().nullable(),
});
