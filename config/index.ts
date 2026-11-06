export const notion = {
  apiSecret: process.env.NOTION_API_SECRET,
  db: {
    projects: process.env.NOTION_PROJECTS_DS_ID,
    basicInfo: process.env.NOTION_BASIC_INFO_DS_ID,
    experience: process.env.NOTION_EXPERIENCE_DS_ID,
    skills: process.env.NOTION_SKILLS_DS_ID,
    testimonies: process.env.NOTION_TESTIMONIES_DS_ID,
    organisations: process.env.NOTION_ORGANISATIONS_DS_ID,
    people: process.env.NOTION_PEOPLE_DS_ID,
    projectClientRelation: process.env.NOTION_PROJECT_CLIENT_RELATIONS_DS_ID,
    projectPeopleRelation: process.env.NOTION_PROJECT_PEOPLE_RELATIONS_DS_ID,
  },
};
