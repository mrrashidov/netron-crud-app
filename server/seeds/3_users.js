
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: "Kemal", email:"kemalbekcan@gmail.com", user_id: 2}
      ]);
    });
};
