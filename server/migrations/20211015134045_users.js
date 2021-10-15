exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.string("email", 255).notNullable();
    table.integer("role_id", 11).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
