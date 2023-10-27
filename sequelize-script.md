npx sequelize-cli model:generate --name User --attributes email:string,password:string,role:string

npx sequelize-cli model:generate --name Profile --attributes name:string,bio:string,UserId:integer

npx sequelize-cli model:generate --name Post --attributes title:string,description:string,image:string,likes:integer

npx sequelize-cli model:generate --name Category --attributes name:string

npx sequelize-cli model:generate --name PostHasCategories --attributes PostId:integer,CategoryId:integer

npx sequelize-cli migration:generate --name add-UserId-in-Posts

npx sequelize-cli migration:generate --name add-gender-in-Profiles

20231026033031-add-UserId-in-Posts

npx sequelize-cli db:seed --seed 20231026035354-seed-category.js
npx sequelize-cli db:seed --seed 20231026035341-seed-post.js

npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js