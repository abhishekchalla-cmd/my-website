import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { getRelationPropertiesInfo } from "@abhishekchalla/services/get-notion-data/relation-properties-info";
import { getNotionMedia } from "@abhishekchalla/services/get-notion-data/media";

export const getNotionDbInfo = async () => {
  const data = {
    relationPropertiesInfo: await getRelationPropertiesInfo(),
    media: await getNotionMedia(),
  };

  return data;
};

if (require.main?.filename === __filename)
  getNotionDbInfo()
    .then((res) =>
      writeFileSync(
        resolve(__dirname, "../notion-data.json"),
        JSON.stringify(res, null, 2),
      ),
    )
    .catch(console.error);
