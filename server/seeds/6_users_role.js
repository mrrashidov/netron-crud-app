exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users_role")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users_role").insert([{ user_id: 1, role_id: 1 }]);
    });
};
