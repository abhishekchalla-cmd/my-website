import { getBlockRecordMap } from "@abhishekchalla/notion";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

test("NotionX Client is working", async () => {
  const pageId = "3dc6346f-aeb0-8089-93dd-da128da70f32"; // Project page: Bharatiya Vyapar Mahotsav

  const recordMap = await getBlockRecordMap(pageId);
  writeFileSync(
    resolve(__dirname, "./notion-x-test.json"),
    JSON.stringify(recordMap, null, 2),
  );

  expect(recordMap).toBeDefined();
}, 100000000);
