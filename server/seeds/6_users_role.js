const users_role = [{ user_id: 1, role_id: 3 }];
exports.seed = (knex) =>
  knex("users_role")
    .del()
    .then(() => knex("users_role").insert(users_role));
