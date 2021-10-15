exports.up = function (knex) {
  return knex.schema.createTable("roles", function (table) {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.string("name", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("roles");
};
