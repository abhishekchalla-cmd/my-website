import { getAllDbRecords } from "@abhishekchalla/notion/index";
import { DB_TYPES } from "@abhishekchalla/schema/db-types";
import { finalBaseSchema } from "@abhishekchalla/schema/index";
import { orm } from "@abhishekchalla/services/orm";
import _ from "lodash";
import { ZodObject } from "zod";

test("ORM fetches all objects and they conform to the the final schema of their respective db types", async () => {
  for (const dbType in DB_TYPES) {
    const res = await orm[dbType].getAll({});
    const dbTypeFinalSchema = finalBaseSchema[dbType] as ZodObject;
    const nonConformingObject = res.find((d) => {
      const parseRes = dbTypeFinalSchema.safeParse(d);
      if (!parseRes.success)
        console.log("Parse result: ", JSON.stringify(parseRes, null, 2));

      return !parseRes.success;
    });

    expect(nonConformingObject).toBeUndefined();

    console.log(`☑️ ORM for DB Type "${dbType}" is working properly`);
  }
}, 100000);

// test("Sample data check", () =>
//   getAllDbRecords(config.notion.db.basicInfo)
//     .then((res) => console.log(JSON.stringify(res, null, 2)))
//     .then(() => expect(true).toBe(true)));
