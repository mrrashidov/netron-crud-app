exports.up = function (knex) {
  return knex.schema.createTable("permissions", function (table) {
    table.increments("id");
    table.string("name", 50).notNullable();
    table.string("description", 255).nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("permissions");
};
