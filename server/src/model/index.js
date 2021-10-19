const User = require("./User");
const Todo = require("./Todo")
const knex = require("knex");
const { development } = require("../../knexfile");

const database = knex(development);

const user = new User(database);
const todo = new Todo(database);

module.exports = {
  user,
  todo
};
