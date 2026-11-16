import * as config from "@abhishekchalla/config";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";

export const DB_TYPE_TO_DB_CONFIG_KEY_MAP: {
  [DBType in keyof typeof DB_TYPES]: keyof typeof config.notion.db;
} = {
  basicInfo: "basicInfo",
  experience: "experience",
  skill: "skills",
  testimony: "testimonies",
  organisation: "organisations",
  person: "people",
  projectClientRelation: "projectClientRelation",
  projectPeopleRelation: "projectPeopleRelation",
  project: "projects",
};

export const UPLOADABLE_NOTION_BLOCK_TYPES = {
  image: "image",
  file: "file",
  video: "video",
  pdf: "pdf",
} as const;
