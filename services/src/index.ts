import { orm } from "@abhishekchalla/services/orm";

if (require.main.filename === __filename) {
  orm.project
    .getAll({
      projectClients: true,
    })
    .then((res) => console.log(JSON.stringify(res, null, 2)))
    .catch(console.error);
}
