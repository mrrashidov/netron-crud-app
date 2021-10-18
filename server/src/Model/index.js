const User = require("./User");
const knex = require("knex");
const { development } = require("../../knexfile");

const database = knex(development);

const user = new User(database);

module.exports = {
  user,
};
