import { getNotionDbInfo } from "@abhishekchalla/services/get-notion-data";
import { getMediaFromDBPages } from "@abhishekchalla/services/get-notion-data/media";

test("Fetch media from notion media DBs", async () => {
  const result = await getMediaFromDBPages();
  console.log(JSON.stringify(result, null, 2));

  expect(result).toBeDefined();
}, 1000000);

test("Get Notion DB Info", async () => {
  const res = await getNotionDbInfo();
  console.log(JSON.stringify(res, null, 2));

  expect(res).toBeDefined();
}, 10000000);
