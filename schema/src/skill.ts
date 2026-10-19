import z from "zod";

export const SKILL_TYPE = {
  dev_ops: "dev_ops",
  db: "db",
  languages: "languages",
  backend: "backend",
  frontend: "frontend",
} as const;

export const SkillSchema = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(Object.values(SKILL_TYPE)),
    score: z.number(),
    order: z.number(),
  }),
  relations: {},
};

export type SkillType = keyof typeof SKILL_TYPE;
