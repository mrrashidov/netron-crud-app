
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('languages').del()
    .then(function () {
      // Inserts seed entries
      return knex('languages').insert([
        {name: "English", slug: "en", default: false},
        {name: "Turkish", slug: "tr", default: true}
      ]);
    });
};
