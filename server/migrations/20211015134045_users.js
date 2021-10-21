exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("first_name", 50).notNullable();
    table.string("last_name", 50).notNullable();
    table.string("email", 254).notNullable();
    table.integer('user_id').notNullable()
    table.specificType("status", 'char(1)').defaultTo(1);
    table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
    table.timestamp("update_at").nullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
