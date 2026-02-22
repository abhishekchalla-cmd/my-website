import * as fs from "fs";
import * as path from "path";
import { BasicInfoSchema } from "@abhishekchalla/schema/notion/pages/basic-info";
import { OrganisationSchema } from "@abhishekchalla/schema/notion/pages/organisation";
import { PersonSchema } from "@abhishekchalla/schema/notion/pages/person";
import { ProjectClientRelationSchema } from "@abhishekchalla/schema/notion/pages/project-client-relation";
import { ProjectPeopleRelationSchema } from "@abhishekchalla/schema/notion/pages/project-people-relation";
import { SkillSchema } from "@abhishekchalla/schema/notion/pages/skill";
import { ExperienceSchema } from "@abhishekchalla/schema/notion/pages/experience";
import { TestimonySchema } from "@abhishekchalla/schema/notion/pages/testimony";
import { z } from "zod";

const OUT_DIR = path.resolve(__dirname, "../out");

// Try to require package.json to get version
let zodVersion = "unknown";
try {
  const pkg = require("../package.json");
  zodVersion = pkg.dependencies?.zod || pkg.devDependencies?.zod || "unknown";
} catch (e) {
  // ignore
}

const validateSchema = (
  fileName: string,
  schema: z.ZodType<any>,
  name: string,
) => {
  const filePath = path.join(OUT_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(
      `File not found: ${fileName}. Skipping validation for ${name}.`,
    );
    return;
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);

    if (!Array.isArray(data)) {
      console.error(`❌ ${name}: Expected array, got ${typeof data}`);
      return;
    }

    let success = true;

    // Validate the whole array first to see if it works
    const arrayResult = z.array(schema).safeParse(data);
    if (arrayResult.success) {
      console.log(`✅ ${name} validation passed (array check).`);
      return;
    }

    // If array check fails, check items individually for better error reporting
    console.log(
      `⚠️ ${name} array validation failed. Checking items individually...`,
    );
    data.forEach((item, index) => {
      const result = schema.safeParse(item);
      if (!result.success) {
        success = false;
        console.error(`❌ ${name} validation failed at index ${index}:`);
        result.error.issues.forEach((err) => {
          console.error(`  - ${err.path.join(".")}: ${err.message}`);
          console.error(`    Value:`, item[err.path[0] as string]);
        });
      }
    });

    if (success) {
      console.log(`✅ ${name} validation passed (item check).`);
    } else {
      console.error(`❌ ${name} validation failed.`);
    }
  } catch (error) {
    console.error(`❌ Error validating ${name}:`, error);
  }
};

const main = () => {
  console.log(`Starting schema validation... Zod Version: ${zodVersion}`);

  validateSchema("basic-info.json", BasicInfoSchema, "Basic Info");
  validateSchema("organisations.json", OrganisationSchema, "Organisations");
  validateSchema("people.json", PersonSchema, "People");
  validateSchema(
    "project-client-relations.json",
    ProjectClientRelationSchema,
    "Project Client Relations",
  );
  validateSchema(
    "project-people-relations.json",
    ProjectPeopleRelationSchema,
    "Project People Relations",
  );
  validateSchema("skills.json", SkillSchema, "Skills");
  validateSchema("experience.json", ExperienceSchema, "Experience");
  validateSchema("testimonies.json", TestimonySchema, "Testimonies");
  console.log("Schema validation complete.");
};

main();
