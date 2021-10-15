exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("todos").insert([
        {
          price: 100,
          select: "price",
          status: true,
          tag_id: 1,
          group_id: 2,
          user_id: 2,
          category_id: 3,
        },
      ]);
    });
};
