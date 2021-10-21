const User = require("./User");
const Todo = require("./Todo");
const TodoTranslations = require("./TodoTranslations");
const Tag = require("./Tag");
const knex = require("knex");
const {development} = require("../../knexfile");

const database = knex(development);

const user = new User(database);
const todo = new Todo(database);
const todoTranslations = new TodoTranslations(database)
const tag = new Tag(database)

module.exports = {
    user,
    todo,
    todoTranslations,
    tag
};
