exports.up = function (knex) {
  return knex.schema.createTable("todos", function (table) {
    table.increments("id");
    table.integer("price").notNullable();
    table.enum("select", ['price','general'])|
    table.boolean("status").notNullable();
    table.integer("tag_id", 11).notNullable();
    table.integer("group_id", 11).notNullable();
    table.integer("category_id", 11).notNullable();
    table.integer("user_id", 11).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todos");
};
