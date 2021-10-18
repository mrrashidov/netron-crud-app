const { User } = require("./User");
const knex = require("knex");

const user = new User(knex);

const models = {
  user,
};

export default models;
