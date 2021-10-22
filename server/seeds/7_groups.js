const groups = [
    {
        user_id: 1,
        title: "friend",
        description: "asdas",
        status: "active",
    },
    {
        user_id: 2,
        title: "company",
        description: "asdasd",
        status: "active",
    },
    {
        user_id: 3,
        title: "sadas",
        description: "other",
        status: "active",
    },

]
exports.seed = (knex) => knex('groups').del().then(() => knex('groups').insert(groups));
