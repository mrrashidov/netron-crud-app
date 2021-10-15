
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('groups_translations').del()
    .then(function () {
      // Inserts seed entries
      return knex('groups_translations').insert([
        {user_id: 1, groups_name: "friend"},
      ]);
    });
};
