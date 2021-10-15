exports.up = function (knex) {
  return knex.schema.createTable("todo_translations", function (table) {
    table.increments("id");
    table.integer("lang_id", 11);
    table.integer("todo_id", 11);
    table.string("name", 50);
    table.string("description", 50);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo_translations");
};
