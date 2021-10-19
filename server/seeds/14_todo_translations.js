exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("todo_translations")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("todo_translations").insert([
        {
          lang_id: 1,
          todo_id: 3,
          header: "Kemal 1",
          description: "Bekcan 1",
        },
        {
          lang_id: 2,
          todo_id: 3,
          header: "Kemal 2",
          description: "Bekcan 2",
        },
      ]);
    });
};
