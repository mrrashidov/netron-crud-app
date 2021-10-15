exports.up = function (knex) {
  return knex.schema.createTable("groups_translations", function (table) {
    table.increments("id");
    table.integer("user_id").notNullable();
    table.string("groups_name", 50).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("groups_translations");
};
