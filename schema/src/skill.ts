import z from "zod/v4";

export const SKILL_TYPE = {
  dev_ops: "dev_ops",
  db: "db",
  languages: "languages",
  backend: "backend",
  frontend: "frontend",
} as const;

export const NOTION_SKILL_TYPE_TO_SKILL_TYPE = {
  "Programming Languages": SKILL_TYPE.languages,
  "Frontend Frameworks": SKILL_TYPE.frontend,
  "Backend Frameworks": SKILL_TYPE.backend,
  Database: SKILL_TYPE.db,
  "DevOps / Infrastructure": SKILL_TYPE.dev_ops,
};

export const SkillSchema = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(Object.values(SKILL_TYPE)),
    score: z.number(),
    order: z.number().optional().nullable(),
  }),
  relations: {},
};

export type SkillType = keyof typeof SKILL_TYPE;
