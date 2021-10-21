const tags = [
    {
        user_id: 1,
        name: "meet",
        color: "red",
        status: "active"
    },
    {
        user_id: 2,
        name: "visit",
        color: "yellow",
        status: "active"
    },
    {
        user_id: 3,
        name: "other",
        color: "blue",
        status: "active"
    },

]
exports.seed = (knex) => knex('tags').del().then(() => knex('tags').insert(tags));