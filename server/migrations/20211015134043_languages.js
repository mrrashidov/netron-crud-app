exports.up = function (knex) {
  return knex.schema.createTable("languages", function (table) {
    table.increments("id");
    table.char("name", 20).notNullable();
    table.char("slug", 3).notNullable();
    table.boolean("default").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("languages");
};
