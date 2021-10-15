exports.up = function (knex) {
  return knex.schema.createTable("user_sessions", function (table) {
    table.integer("user_id", 11).notNullable();
    table.string("token", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("user_sessions");
};
