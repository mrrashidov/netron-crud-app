exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("role_permissions")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("role_permissions").insert([
        { role_id: 1, permission_id: 2 },
      ]);
    });
};
