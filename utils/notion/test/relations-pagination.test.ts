import { getAllObjectRelations } from "@abhishekchalla/notion";

const N = 3;
test(
  "fetches more than " +
    N +
    " unique records from DB page relations with a page size of " +
    N,
  async () => {
    const pageId = "2766346f-aeb0-8064-a54a-cdff33ca7a9a"; // DB: Project
    const propertyId = "%7D%3C%7CW";

    const result = await getAllObjectRelations(pageId, propertyId, N);

    expect(result.length).toBeGreaterThan(N);
  },
);
