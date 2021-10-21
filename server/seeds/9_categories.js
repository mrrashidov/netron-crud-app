const categories = [
    {
        user_id: 1,
        title: "business",
        description: "business plan",
        status: "active"
    },
    {
        user_id: 2,
        title: "school",
        description: "school plan",
        status: "active"
    },
    {
        user_id: 3,
        title: "other",
        description: "others plan",
        status: "active"
    },
]
exports.seed = (knex) => knex('categories').del().then(() => knex('categories').insert(categories));