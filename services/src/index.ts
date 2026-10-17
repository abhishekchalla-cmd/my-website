import { orm } from "@abhishekchalla/services/utils/defs";

if (require.main.filename === __filename) {
  orm.project
    .getAll({
      projectClients: {},
    })
    .then((res) => console.log(JSON.stringify(res, null, 2)));
}
