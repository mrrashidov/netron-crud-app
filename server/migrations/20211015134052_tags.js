exports.up = function (knex) {
  return knex.schema.createTable("tags", function (table) {
    table.increments("id");
    table.string("tags_name", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tags");
};
