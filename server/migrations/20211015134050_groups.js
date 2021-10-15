exports.up = function (knex) {
  return knex.schema.createTable("groups", function (table) {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.string("group_name", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("groups");
};
