const { User } = require("./User");
const knex = require("knex");
const knexFile = require("../../knexfile");

const database = knex(knexFile);

const user = new User(database);

const models = {
  user,
};

export default models;
