const { status } = require("../src/helpers/constants");
const users = [
  {
    first_name: "Kemal",
    last_name: "Bekcan",
    avatar: "https://picsum.photos/200/300",
    email: "kemalbekcan@gmail.com",
    password: "$2b$10$9s8f4ik2hhKtyh4mI/H0su3mGsTUr/1k.NYpukWCDCxLsfvzQb7VW",
    status: status.active.id,
  },
];
exports.seed = (knex) =>
  knex("users")
    .del()
    .then(() => knex("users").insert(users));
