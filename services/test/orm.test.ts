import { orm } from "@abhishekchalla/services/orm";

test("ORM is fetching all objects", async () => {
  const res = {
    // projectsBase: await orm.project.getAll({}),
    projectsWithProjectClients: await orm.project.getAll({
      projectClients: true,
    }),
  };

  console.log(JSON.stringify(res, null, 2));

  expect(res).toBeDefined();
});
