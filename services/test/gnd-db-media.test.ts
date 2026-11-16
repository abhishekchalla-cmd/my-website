import {
  getMediaFromDBFileProperties,
  getMediaFromDBPages,
} from "@abhishekchalla/services/get-notion-data/media";

test("Fetch media from notion DB media properties", async () => {
  const result = await getMediaFromDBFileProperties();
  console.log(JSON.stringify(result, null, 2));

  expect(result).toBeDefined();
}, 1000000);

test("Fetch media from notion media DBs", async () => {
  const result = await getMediaFromDBPages();
  console.log(JSON.stringify(result, null, 2));

  expect(result).toBeDefined();
}, 1000000);
