const groups = [
    {
        user_id: 1,
        title: "friend",
        description: "",
        status: "active",
        role_id: 1,
    },
    {
        user_id: 2,
        title: "company",
        description: "",
        status: "active",
        role_id: 1,
    },
    {
        user_id: 3,
        title: "",
        description: "other",
        status: "active",
    },

]
exports.seed = (knex) => knex('groups').del().then(() => knex('groups').insert(groups));
