exports.up = function (knex) {
  return knex.schema.createTable("role_permissions", function (table) {
    table.integer("role_id", 11).notNullable();
    table.integer("permission_id", 11).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("role_permissions");
};
