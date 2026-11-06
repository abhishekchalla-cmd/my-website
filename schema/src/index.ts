import { DBTypeVFinalRelationsSchemaMap } from "@abhishekchalla/orm/types";
import { BasicInfoSchema } from "@abhishekchalla/schema/basic-info";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import { ExperienceSchema } from "@abhishekchalla/schema/experience";
import { NotionBasicInfoSchema } from "@abhishekchalla/schema/notion/basic-info";
import { NotionExperienceSchema } from "@abhishekchalla/schema/notion/experience";
import { NotionOrganisationSchema } from "@abhishekchalla/schema/notion/organisation";
import { NotionPersonSchema } from "@abhishekchalla/schema/notion/person";
import { NotionProjectSchema } from "@abhishekchalla/schema/notion/project";
import { NotionProjectClientRelationSchema } from "@abhishekchalla/schema/notion/project-client-relation";
import { NotionProjectPeopleRelationSchema } from "@abhishekchalla/schema/notion/project-people-relation";
import { NotionSkillSchema } from "@abhishekchalla/schema/notion/skill";
import { NotionTestimonySchema } from "@abhishekchalla/schema/notion/testimony";
import { OrganisationSchema } from "@abhishekchalla/schema/organisation";
import { PersonSchema } from "@abhishekchalla/schema/person";
import {
  ProjectClientRelationSchema,
  ProjectPeopleRelationSchema,
  ProjectSchema,
} from "@abhishekchalla/schema/project";
import { SkillSchema } from "@abhishekchalla/schema/skill";
import { TestimonySchema } from "@abhishekchalla/schema/testimony";
import z from "zod/v4";

export type DBTypeVRawSchemaMap<DBTypes> = {
  [DBType in keyof DBTypes]: z.ZodObject;
};

export type DBTypeVRawSchemaVFinalSchemaRelationsMap<
  DBTypes,
  TypeToRawSchemaMap extends DBTypeVRawSchemaMap<DBTypes>,
  TypeToFinalRelationsSchemaMap extends DBTypeVFinalRelationsSchemaMap<DBTypes>,
> = {
  [DBType in keyof DBTypes]: {
    [FinalSchemaRelationName in keyof TypeToFinalRelationsSchemaMap[DBType]]: keyof TypeToRawSchemaMap[DBType]["shape"]["properties"]["shape"] /* notion specific logic */;
  };
};

export const rawSchema = {
  [DB_TYPES.basicInfo]: NotionBasicInfoSchema,
  [DB_TYPES.experience]: NotionExperienceSchema,
  [DB_TYPES.organisation]: NotionOrganisationSchema,
  [DB_TYPES.person]: NotionPersonSchema,
  [DB_TYPES.projectClientRelation]: NotionProjectClientRelationSchema,
  [DB_TYPES.projectPeopleRelation]: NotionProjectPeopleRelationSchema,
  [DB_TYPES.project]: NotionProjectSchema,
  [DB_TYPES.skill]: NotionSkillSchema,
  [DB_TYPES.testimony]: NotionTestimonySchema,
};

export const finalBaseSchema = {
  [DB_TYPES.basicInfo]: BasicInfoSchema.base,
  [DB_TYPES.experience]: ExperienceSchema.base,
  [DB_TYPES.organisation]: OrganisationSchema.base,
  [DB_TYPES.person]: PersonSchema.base,
  [DB_TYPES.projectClientRelation]: ProjectClientRelationSchema.base,
  [DB_TYPES.projectPeopleRelation]: ProjectPeopleRelationSchema.base,
  [DB_TYPES.project]: ProjectSchema.base,
  [DB_TYPES.skill]: SkillSchema.base,
  [DB_TYPES.testimony]: TestimonySchema.base,
};

export const finalRelationsSchema = {
  [DB_TYPES.basicInfo]: BasicInfoSchema.relations,
  [DB_TYPES.experience]: ExperienceSchema.relations,
  [DB_TYPES.organisation]: OrganisationSchema.relations,
  [DB_TYPES.person]: PersonSchema.relations,
  [DB_TYPES.projectClientRelation]: ProjectClientRelationSchema.relations,
  [DB_TYPES.projectPeopleRelation]: ProjectPeopleRelationSchema.relations,
  [DB_TYPES.project]: ProjectSchema.relations,
  [DB_TYPES.skill]: SkillSchema.relations,
  [DB_TYPES.testimony]: TestimonySchema.relations,
};

export const finalSchemaVRawSchemaRelationsMapping: DBTypeVRawSchemaVFinalSchemaRelationsMap<
  typeof DB_TYPES,
  typeof rawSchema,
  typeof finalRelationsSchema
> = {
  basicInfo: {},
  experience: {
    company: "Organisation",
  },
  organisation: {},
  person: {
    experience: "Experience",
  },
  projectClientRelation: {
    organisation: "Organisation",
    person: "People",
  },
  projectPeopleRelation: {
    person: "Person",
  },
  project: {
    projectClients: "Project Client Relation",
    projectPeople: "Project People Relation",
  },
  skill: {},
  testimony: {
    person: "By",
  },
};

export const mediaFields: {
  [DBType in keyof typeof DB_TYPES]?: (keyof z.infer<
    (typeof rawSchema)[DBType]
  >["properties"])[];
} = {
  basicInfo: ["Avatar", "Cover"],
  organisation: ["Thumbnail"],
  project: ["Thumbnail", "Cover"],
};
