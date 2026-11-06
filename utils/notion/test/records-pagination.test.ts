import * as config from "@abhishekchalla/config";
import { getAllDbRecords } from "@abhishekchalla/notion";

const N = 10;
test(
  "fetches more than " +
    N +
    " unique records from a DB with a page size of " +
    N,
  async () => {
    const res = await getAllDbRecords(config.notion.db.skills, N); // Skills DB has more than N unique records
    console.log("Records found: ", res.length);
    const uniqueRecords = Object.keys(
      res.reduce((acc, r) => {
        acc[(r as any).properties.Name.title[0].text.content] = true;
        return acc;
      }, {}) as object,
    ).length;

    expect(uniqueRecords).toBeGreaterThan(N);
  },
);
