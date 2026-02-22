import { Project, ProjectSchema } from "@abhishekchalla/schema/project";
import { Person, PersonSchema } from "@abhishekchalla/schema/person";
import {
  Organisation,
  OrganisationSchema,
} from "@abhishekchalla/schema/organisation";
import {
  Experience,
  ExperienceSchema,
} from "@abhishekchalla/schema/experience";
import { Skill, SkillSchema } from "@abhishekchalla/schema/skill";
import { Testimony, TestimonySchema } from "@abhishekchalla/schema/testimony";
import {
  ProjectClientRelation,
  ProjectClientSchema as ProjectClientRelationSchema,
} from "@abhishekchalla/schema/project";
import {
  ProjectPeopleRelation,
  ProjectPeopleRelationSchema,
} from "@abhishekchalla/schema/project";
import { BasicInfo, BasicInfoSchema } from "@abhishekchalla/schema/basic-info";

export type DBType =
  | Project
  | Person
  | Organisation
  | Experience
  | Skill
  | Testimony
  | ProjectClientRelation
  | ProjectPeopleRelation
  | BasicInfo;

export type DBTypeSchema =
  | typeof ProjectSchema
  | typeof PersonSchema
  | typeof OrganisationSchema
  | typeof ExperienceSchema
  | typeof SkillSchema
  | typeof TestimonySchema
  | typeof ProjectClientRelationSchema
  | typeof ProjectPeopleRelationSchema
  | typeof BasicInfoSchema;
