import { generateOrm } from "@abhishekchalla/orm";

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
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import { getAllObjectRelations } from "@abhishekchalla/notion/index";
import {
  finalBaseSchema,
  finalRelationsSchema,
  finalSchemaVRawSchemaRelationsMapping,
} from "@abhishekchalla/schema";
import { relationPropertiesInfo } from "@abhishekchalla/services/notion-data.json";

export const orm = generateOrm(
  DB_TYPES,

  // Final schema
  finalBaseSchema,
  finalRelationsSchema,

  // Get By Id
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

  // Get All
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

  // Get related data function
  async (rootDBType, objectId, finalSchemaRelationKey) => {
    const relationKeyId = (
      relationPropertiesInfo as typeof finalSchemaVRawSchemaRelationsMapping
    )[rootDBType][finalSchemaRelationKey];

    return getAllObjectRelations(objectId, relationKeyId as string);
  },
);
