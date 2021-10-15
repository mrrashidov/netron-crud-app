exports.up = function (knex) {
  return knex.schema.createTable("logs", function (table) {
    table.increments("id");
    table.integer("user_id");
    table.string("description", 100).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("logs");
};
