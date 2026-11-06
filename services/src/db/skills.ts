import * as config from "@abhishekchalla/config";
import { NotionSkillSchema } from "@abhishekchalla/schema/notion/skill";
import { getPageById, getAllDbRecords } from "@abhishekchalla/notion";
import z from "zod/v4";
import { SKILL_TYPE, SkillSchema } from "@abhishekchalla/schema/skill";

export const getSkills: () => Promise<
  z.infer<typeof SkillSchema.base>[]
> = () =>
  getAllDbRecords<typeof NotionSkillSchema>(config.notion.db.skills).then(
    (res) => res.map(translate),
  );

export const getSkill: (
  id: string,
) => Promise<z.infer<typeof SkillSchema.base>> = (id) =>
  getPageById<typeof NotionSkillSchema>(id).then(translate);

const translate: (
  res: z.infer<typeof NotionSkillSchema>,
) => z.infer<typeof SkillSchema.base> = (res) => ({
  id: res.id,
  name: res.properties.Name.title[0].plain_text,
  type: SKILL_TYPE[res.properties.Type.multi_select[0].id],
  score: res.properties.Score.number,
  order: res.properties.Order.number,
});
