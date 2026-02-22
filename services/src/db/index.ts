import { resolve } from "path";
import { writeFileSync } from "fs";
import { getProjects } from "@abhishekchalla/services/db/projects";
import { getBasicInfo } from "@abhishekchalla/services/db/basic-info";
import { getOrganisations } from "@abhishekchalla/services/db/organisations";
import { getPeople } from "@abhishekchalla/services/db/people";
import { getProjectClientRelations } from "@abhishekchalla/services/db/project-client-relations";
import { getProjectPeopleRelations } from "@abhishekchalla/services/db/project-people-relations";
import { getSkills } from "@abhishekchalla/services/db/skills";
import { getExperience } from "@abhishekchalla/services/db/experience";
import { getTestimonies } from "@abhishekchalla/services/db/testimonies";

if (require.main.filename === __filename) {
  Promise.all([
    getProjects().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/projects.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getBasicInfo().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/basic-info.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getSkills().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/skills.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getExperience().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/experience.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getTestimonies().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/testimonies.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getOrganisations().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/organisations.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getPeople().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/people.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getProjectClientRelations().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/project-client-relations.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
    getProjectPeopleRelations().then((res) =>
      writeFileSync(
        resolve(__dirname, "../../out/project-people-relations.json"),
        JSON.stringify(res, null, 2),
      ),
    ),
  ]);
}
