exports.up = function (knex) {
    return knex.schema.createTable("todos", function (table) {
        table.increments("id");
        table.integer("user_id").notNullable();
        table.string("title", 255).notNullable();
        table.string("description", 1000).nullable();
        table.timestamp("date").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        table.specificType("status", 'char(1)').defaultTo(1);
        table.timestamp("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP"));
        table.timestamp("update_at").nullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable("todos");
};
