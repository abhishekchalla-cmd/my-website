export const notion = {
  apiSecret: process.env.NOTION_API_SECRET,
  db: {
    projects: process.env.NOTION_PROJECTS_DB_ID,
    basicInfo: process.env.NOTION_BASIC_INFO_DB_ID,
    experience: process.env.NOTION_EXPERIENCE_DB_ID,
    skills: process.env.NOTION_SKILLS_DB_ID,
    testimonies: process.env.NOTION_TESTIMONIES_DB_ID,
    organisations: process.env.NOTION_ORGANISATIONS_DB_ID,
    people: process.env.NOTION_PEOPLE_DB_ID,
    projectClientRelation: process.env.NOTION_PROJECT_CLIENT_RELATIONS_DB_ID,
    projectPeopleRelation: process.env.NOTION_PROJECT_PEOPLE_RELATIONS_DB_ID,
  },
};
