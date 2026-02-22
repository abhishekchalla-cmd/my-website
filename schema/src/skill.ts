import z from "zod";

export const SKILL_TYPE = {
  dev_ops: "dev_ops",
  db: "db",
  languages: "languages",
  backend: "backend",
  frontend: "frontend",
} as const;

export const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(Object.values(SKILL_TYPE)),
  score: z.number(),
  order: z.number(),
});

export type SkillType = keyof typeof SKILL_TYPE;
export type Skill = z.infer<typeof SkillSchema>;
