exports.up = function (knex) {
  return knex.schema.createTable("category_translations", function (table) {
    table.increments("id");
    table.string("category_name_en", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("category_translations");
};
