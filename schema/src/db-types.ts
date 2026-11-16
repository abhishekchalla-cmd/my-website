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
  offerings: "offerings",
  projectDetailPage: "projectDetailPage",
} as const;

export type DBTypes = typeof DB_TYPES;
