const User = require("./User");
const Todo = require("./Todo");
const Tag = require("./Tag");
const UserRole = require("./UserRole");
const Language = require("./Language");
const knex = require("knex");
const { development } = require("../../knexfile");

const database = knex(development);

const user = new User(database);
const todo = new Todo(database);
const tag = new Tag(database);
const userRole = new UserRole(database);
const language = new Language(database);

module.exports = {
  user,
  todo,
  tag,
  userRole,
  language,
};
