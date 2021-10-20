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
          title: "kemal",
          description: "bekcan",
        },
      ]);
    });
};
