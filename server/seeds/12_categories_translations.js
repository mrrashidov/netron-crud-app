
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('category_translations').del()
    .then(function () {
      // Inserts seed entries
      return knex('category_translations').insert([
        {category_name_en: "Price"},
        {category_name_en: "General"}
      ]);
    });
};
