# Abhishek Challa Portfolio website

## 1. How to add a new Notion DB type

1. Create a new **Notion Data Source ID** env variable in `.env` file in root folder
2. Source that env var in the `config/index.ts` file in `notion.db` object
3. Include the DB Type in `schema/db-types.ts` file
4. Create a new raw schema file in `schema/src/notion` folder
5. Create a new final schema file in `schema/src` folder
6. Include that DB Type in `schema/src/index.ts` file in all the objects
7. Create service file including **getAll**, **getOne** and **translate** functions in `services/src/db` folder
8. Create mapping of the DB Type's name in `schema/src/index.ts` file against it's name in `config/index.ts` file in `services/src/get-notion-data/consts.ts` file in the `DB_TYPE_TO_DB_CONFIG_KEY_MAP` object
9. Include the DB Type in `services/src/orm.ts` file
