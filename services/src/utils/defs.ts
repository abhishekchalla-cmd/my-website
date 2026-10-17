import { generateOrm } from "./orm";

import { NotionBasicInfoSchema } from "@abhishekchalla/schema/notion/pages/basic-info";
import { NotionProjectClientRelationSchema } from "@abhishekchalla/schema/notion/pages/project-client-relation";
import { NotionProjectPeopleRelationSchema } from "@abhishekchalla/schema/notion/pages/project-people-relation";
import { NotionSkillSchema } from "@abhishekchalla/schema/notion/pages/skill";
import { NotionProjectSchema } from "@abhishekchalla/schema/notion/pages/project";
import { NotionPersonSchema } from "@abhishekchalla/schema/notion/pages/person";
import { NotionOrganisationSchema } from "@abhishekchalla/schema/notion/pages/organisation";
import { NotionExperienceSchema } from "@abhishekchalla/schema/notion/pages/experience";
import { NotionTestimonySchema } from "@abhishekchalla/schema/notion/pages/testimony";

import { BasicInfoSchema } from "@abhishekchalla/schema/basic-info";
import { ExperienceSchema } from "@abhishekchalla/schema/experience";
import { OrganisationSchema } from "@abhishekchalla/schema/organisation";
import { PersonSchema } from "@abhishekchalla/schema/person";
import {
  ProjectSchema,
  ProjectClientRelationSchema,
  ProjectPeopleRelationSchema,
} from "@abhishekchalla/schema/project";
import { SkillSchema } from "@abhishekchalla/schema/skill";
import { TestimonySchema } from "@abhishekchalla/schema/testimony";
import { identity } from "lodash";
import {
  getBasicInfo,
  getBasicInfos,
} from "@abhishekchalla/services/db/basic-info";
import {
  getExperience,
  getExperiences,
} from "@abhishekchalla/services/db/experience";
import {
  getOrganisation,
  getOrganisations,
} from "@abhishekchalla/services/db/organisations";
import { getPeople, getPerson } from "@abhishekchalla/services/db/people";
import {
  getProjectClientRelation,
  getProjectClientRelations,
} from "@abhishekchalla/services/db/project-client-relations";
import {
  getProjectPeopleRelation,
  getProjectPeopleRelations,
} from "@abhishekchalla/services/db/project-people-relations";
import { getProject, getProjects } from "@abhishekchalla/services/db/projects";
import { getSkill, getSkills } from "@abhishekchalla/services/db/skills";
import {
  getTestimonies,
  getTestimony,
} from "@abhishekchalla/services/db/testimonies";
import { DB_TYPES, DBTypes } from "@abhishekchalla/schema/db-types";
import { RelationsResolverOpts } from "./orm/types";

const finalSchema = {
  [DB_TYPES.basicInfo]: BasicInfoSchema,
  [DB_TYPES.experience]: ExperienceSchema,
  [DB_TYPES.organisation]: OrganisationSchema,
  [DB_TYPES.person]: PersonSchema,
  [DB_TYPES.projectClientRelation]: ProjectClientRelationSchema,
  [DB_TYPES.projectPeopleRelation]: ProjectPeopleRelationSchema,
  [DB_TYPES.project]: ProjectSchema,
  [DB_TYPES.skill]: SkillSchema,
  [DB_TYPES.testimony]: TestimonySchema,
};

export const orm = generateOrm(
  DB_TYPES,

  // Raw Schema
  {
    basicInfo: NotionBasicInfoSchema,
    experience: NotionExperienceSchema,
    organisation: NotionOrganisationSchema,
    person: NotionPersonSchema,
    projectClientRelation: NotionProjectClientRelationSchema,
    projectPeopleRelation: NotionProjectPeopleRelationSchema,
    project: NotionProjectSchema,
    skill: NotionSkillSchema,
    testimony: NotionTestimonySchema,
  },

  // Final schema
  finalSchema,

  // Final schema relations to Raw schema relations mapping
  {
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
    testimony: {},
  },

  // Raw to Final schema Transformer
  {
    basicInfo: identity,
    experience: identity,
    organisation: identity,
    person: identity,
    projectClientRelation: identity,
    projectPeopleRelation: identity,
    project: identity,
    skill: identity,
    testimony: identity,
  },

  // Get Raw By Id
  {
    basicInfo: getBasicInfo,
    experience: getExperience,
    organisation: getOrganisation,
    person: getPerson,
    projectClientRelation: getProjectClientRelation,
    projectPeopleRelation: getProjectPeopleRelation,
    project: getProject,
    skill: getSkill,
    testimony: getTestimony,
  },

  // Get Raw All
  {
    basicInfo: getBasicInfos,
    experience: getExperiences,
    organisation: getOrganisations,
    person: getPeople,
    projectClientRelation: getProjectClientRelations,
    projectPeopleRelation: getProjectPeopleRelations,
    project: getProjects,
    skill: getSkills,
    testimony: getTestimonies,
  },
);

const o: RelationsResolverOpts<DBTypes, "experience", typeof finalSchema> = {};
