
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tag_translations').del()
    .then(function () {
      // Inserts seed entries
      return knex('tag_translations').insert([
        {tags_name_en: "General"}
      ]);
    });
};
