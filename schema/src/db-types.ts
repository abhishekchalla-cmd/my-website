export const DB_TYPES = {
  basicInfo: "basicInfo",
  experience: "experience",
  organisation: "organisation",
  person: "person",
  projectClientRelation: "projectClientRelation",
  projectPeopleRelation: "projectPeopleRelation",
  project: "project",
  skill: "skill",
  testimony: "testimony",
} as const;

export type DBTypes = typeof DB_TYPES;
