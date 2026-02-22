import { notionClient } from "@abhishekchalla/services/utils/notion-client";

if (require.main.filename === __filename) {
  // NotionProjectPageSchema.array().parse(
  //   JSON.parse(
  //     readFileSync(resolve(__dirname, "../out/projects.json"), "utf-8"),
  //   ),
  // );

  Promise.all([
    // Organisations
    notionClient.databases.retrieve({
      database_id: "2766346faeb08002b57ec82e304e49a1",
    }),

    // People
    notionClient.databases.retrieve({
      database_id: "2766346faeb080a28408cfa4b530c7f8",
    }),

    // Project Client Relations
    notionClient.databases.retrieve({
      database_id: "2766346faeb0807a8b5cf052f78071af",
    }),

    // Project People Relations
    notionClient.databases.retrieve({
      database_id: "2766346faeb080a5b4e3fb954e49f790",
    }),
  ]).then((res) => console.log(JSON.stringify(res, null, 2)));
}
