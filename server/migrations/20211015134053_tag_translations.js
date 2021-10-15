exports.up = function (knex) {
  return knex.schema.createTable("tag_translations", function (table) {
    table.increments("id");
    table.string("tags_name_en", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tag_translations");
};
