import z from "zod";
import { NotionRichTextPropertySchema } from "./notion/properties";
import { DB_TYPES } from "./db-types";

export const PROJECT_ROLE = {
  owner: "owner",
  tech_lead: "tech_lead",
  full_stack_developer: "full_stack_developer",
  frontend_developer: "frontend_developer",
  creator: "creator",
} as const;

export const NOTION_PROJECT_TO_PROJECT_ROLE = {
  "Tech Lead": PROJECT_ROLE.tech_lead,
  Owner: PROJECT_ROLE.owner,
  "Full Stack Developer": PROJECT_ROLE.full_stack_developer,
  "Frontend Developer": PROJECT_ROLE.frontend_developer,
  Creator: PROJECT_ROLE.creator,
};

export const PROJECT_TYPE = {
  work: "work",
  personal: "personal",
} as const;

export const NOTION_PROJECT_TYPE_TO_PROJECT_TYPE = {
  Work: PROJECT_TYPE.work,
  Personal: PROJECT_TYPE.personal,
};

export const PROJECT_VISIBILITY = {
  public: "public",
  private: "private",
} as const;

export const NOTION_PROJECT_VISIBILITY_TO_PROJECT_VISIBILITY = {
  Public: PROJECT_VISIBILITY.public,
  Private: PROJECT_VISIBILITY.private,
};

export const PROJECT_CLIENT_TYPE = {
  individual: "individual",
  organisation: "organisation",
} as const;

export const NOTION_PROJECT_CLIENT_TYPE_TO_PROJECT_CLIENT_TYPE = {
  Person: PROJECT_CLIENT_TYPE.individual,
  Organisation: PROJECT_CLIENT_TYPE.organisation,
};

export const ProjectClientRelationSchema = {
  base: z.object({
    id: z.string(),
    type: z.literal(Object.values(PROJECT_CLIENT_TYPE)),
    title: z.string(),
  }),
  relations: {
    organisation: {
      dbType: DB_TYPES.organisation,
      isMulti: false,
    },
    person: {
      dbType: DB_TYPES.person,
      isMulti: false,
    },
  },
};

export const ProjectPeopleRelationSchema = {
  base: z.object({
    id: z.string(),
    role: z.string(),
  }),
  relations: {
    person: {
      dbType: DB_TYPES.person,
      isMulti: false,
    },
  },
};

export const ProjectSchema = {
  base: z.object({
    id: z.string(),
    name: z.string(),
    description: NotionRichTextPropertySchema,
    startDate: z.iso.datetime().optional(),
    endDate: z.iso.datetime().optional(),
    role: z.enum(Object.values(PROJECT_ROLE)).array(),
    type: z.enum(Object.values(PROJECT_TYPE)),
    visibility: z.enum(Object.values(PROJECT_VISIBILITY)),
    thumbnailUrl: z.url().optional(),
    cover: z.url().optional(),
  }),
  relations: {
    projectClients: {
      dbType: DB_TYPES.projectClientRelation,
      isMulti: true,
    },
    projectPeople: {
      dbType: DB_TYPES.projectPeopleRelation,
      isMulti: true,
    },
  },
};
