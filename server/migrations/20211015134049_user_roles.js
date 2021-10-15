exports.up = function (knex) {
  return knex.schema.createTable("users_role", function (table) {
    table.increments("id");
    table.integer("user_id", 11).notNullable();
    table.integer("role_id", 11).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users_role");
};
