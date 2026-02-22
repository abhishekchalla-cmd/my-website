import { BasicInfo } from "@abhishekchalla/schema/basic-info";
import { Experience } from "@abhishekchalla/schema/experience";
import { Organisation } from "@abhishekchalla/schema/organisation";
import { Person } from "@abhishekchalla/schema/person";
import {
  ProjectClientRelation,
  ProjectPeopleRelation,
  Project,
} from "@abhishekchalla/schema/project";
import { Skill } from "@abhishekchalla/schema/skill";
import { Testimony } from "@abhishekchalla/schema/testimony";
import { DBType, DBTypeSchema } from "@abhishekchalla/schema/index";

type RelationResolverOptions<DB extends DBType> = {
  [Prop in keyof DB]?:
    | boolean
    | (DB[Prop] extends DBType ? RelationResolverOptions<DB[Prop]> : never);
};

export type RelationsResolver<T extends DBType> = <
  RelResOpts extends RelationResolverOptions<T>,
>(
  baseDBTypeSchema: DBTypeSchema
  relResOpts: RelResOpts,
) => {
  getBasicInfo: (
    relRes: RelationsResolver<BasicInfo>,
  ) => RelResFnReturnType<T, RelResOpts, BasicInfo>;

  getProject: (
    projectId: string,
    relRes: RelationsResolver<Project>,
  ) => undefined | Promise<Project>;
  getProjects: (
    projectId: string,
    relRes: RelationsResolver<Project>,
  ) => undefined | Promise<Project>[];

  getPerson: (
    personId: string,
    relRes: RelationsResolver<Person>,
  ) => undefined | Promise<Person>;
  getPeople: (
    personId: string,
    relRes: RelationsResolver<Person>,
  ) => undefined | Promise<Person>[];

  getOrganisation: (
    organisationId: string,
    relRes: RelationsResolver<Organisation>,
  ) => undefined | Promise<Organisation>;
  getOrganisations: (
    organisationId: string,
    relRes: RelationsResolver<Organisation>,
  ) => undefined | Promise<Organisation>[];

  getExperience: (
    experienceId: string,
    relRes: RelationsResolver<Experience>,
  ) => undefined | Promise<Experience>;
  getExperiences: (
    experienceId: string,
    relRes: RelationsResolver<Experience>,
  ) => undefined | Promise<Experience>[];

  getProjectPeopleRelation: (
    projectPeopleRelationId: string,
    relRes: RelationsResolver<ProjectPeopleRelation>,
  ) => undefined | Promise<ProjectPeopleRelation>;
  getProjectPeopleRelations: (
    projectPeopleRelationId: string,
    relRes: RelationsResolver<ProjectPeopleRelation>,
  ) => undefined | Promise<ProjectPeopleRelation>[];

  getProjectClientRelation: (
    projectClientId: string,
    relRes: RelationsResolver<ProjectClientRelation>,
  ) => undefined | Promise<ProjectClientRelation>;
  getProjectClientRelations: (
    projectClientId: string,
    relRes: RelationsResolver<ProjectClientRelation>,
  ) => undefined | Promise<ProjectClientRelation>[];

  getSkill: (
    skillId: string,
    relRes: RelationsResolver<Skill>,
  ) => undefined | Promise<Skill>;
  getSkills: (
    skillId: string,
    relRes: RelationsResolver<Skill>,
  ) => undefined | Promise<Skill>[];

  getTestimony: (
    testimonyId: string,
    relRes: RelationsResolver<Testimony>,
  ) => undefined | Promise<Testimony>;
  getTestimonies: (
    testimonyId: string,
    relRes: RelationsResolver<Testimony>,
  ) => undefined | Promise<Testimony>[];
};


type RelResFnReturnType<DB extends DBType, RelResOpts extends RelationResolverOptions<DB>, RefDB extends DBType> = 