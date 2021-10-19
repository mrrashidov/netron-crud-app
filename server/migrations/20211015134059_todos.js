exports.up = function (knex) {
  return knex.schema.createTable("todos", function (table) {
    table.increments("id");
    table.string("header").notNullable();
    table.string("description").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todos");
};
