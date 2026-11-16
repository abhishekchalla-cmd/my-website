const EnvValueOrError = (envVarName: string) => {
  if (!process.env[envVarName])
    throw new Error("No value provided for: " + envVarName);
  return process.env[envVarName];
};

export const notion = {
  apiSecret: EnvValueOrError("NOTION_API_SECRET"),
  db: {
    projects: EnvValueOrError("NOTION_PROJECTS_DS_ID"),
    basicInfo: EnvValueOrError("NOTION_BASIC_INFO_DS_ID"),
    experience: EnvValueOrError("NOTION_EXPERIENCE_DS_ID"),
    skills: EnvValueOrError("NOTION_SKILLS_DS_ID"),
    testimonies: EnvValueOrError("NOTION_TESTIMONIES_DS_ID"),
    organisations: EnvValueOrError("NOTION_ORGANISATIONS_DS_ID"),
    people: EnvValueOrError("NOTION_PEOPLE_DS_ID"),
    projectClientRelation: EnvValueOrError(
      "NOTION_PROJECT_CLIENT_RELATIONS_DS_ID",
    ),
    projectPeopleRelation: EnvValueOrError(
      "NOTION_PROJECT_PEOPLE_RELATIONS_DS_ID",
    ),
    offerings: EnvValueOrError("NOTION_OFFERINGS_DS_ID"),
    projectDetailPages: EnvValueOrError("NOTION_PROJECT_DETAIL_PAGE_DS_ID"),
  },
};

export const s3 = {
  region: EnvValueOrError("AWS_REGION"),
  bucketName: EnvValueOrError("AWS_S3_BUCKET_NAME"),
};
