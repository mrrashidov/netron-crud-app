const { status } = require('../src/helpers/constants');
const categories = [
    {
        user_id: 1,
        title: "business",
        description: "business plan",
        status: status.active.id
    },
    {
        user_id: 2,
        title: "school",
        description: "school plan",
        status: status.active.id
    },
    {
        user_id: 3,
        title: "other",
        description: "others plan",
        status: status.active.id
    },
]
exports.seed = (knex) => knex('categories').del().then(() => knex('categories').insert(categories));