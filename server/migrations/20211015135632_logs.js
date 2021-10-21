exports.up = function (knex) {
  return knex.schema.createTable("logs", function (table) {
    table.increments("id");
    table.integer("user_id");
    table.json("meta").nullable();
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("logs");
};
