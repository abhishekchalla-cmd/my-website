import { getDBRecords } from "@abhishekchalla/services/notion/db";
import { getDBResultPages } from "@abhishekchalla/services/notion/pages";
import * as config from "@abhishekchalla/config";
import { writeFileSync } from "fs";
import { resolve } from "path";
import z from "zod";

export const getAllDbRecords = async <T extends z.ZodType>(
  dbId: string,
): Promise<z.infer<T>[]> => {
  let hasMore = true;
  let cursor: string | undefined = undefined;
  const pages: any[] = [];

  while (hasMore) {
    const dbResult = await getDBRecords(dbId);
    pages.push(...(await getDBResultPages(dbResult.results)));
    hasMore = dbResult.has_more;
    cursor = dbResult.next_cursor;
  }

  return pages as z.infer<T>[];
};

if (require.main.filename === __filename) {
  getAllDbRecords(config.notion.db.projects).then((pages) => {
    writeFileSync(
      resolve(__dirname, "../../out/projects.json"),
      JSON.stringify(pages, null, 2),
    );
  });
}
