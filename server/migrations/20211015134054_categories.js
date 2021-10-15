exports.up = function (knex) {
  return knex.schema.createTable("categories", function (table) {
    table.increments("id");
    table.string("category_name", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("categories");
};
