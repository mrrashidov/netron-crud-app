const { status } = require("../src/helpers/constants");
const groups = [
    {
        user_id: 1,
        title: "friend",
        description: "asdas",
        status: status.active.id,
    },
    {
        user_id: 2,
        title: "company",
        description: "asdasd",
        status: status.active.id,
    },
    {
        user_id: 3,
        title: "sadas",
        description: "other",
        status: status.active.id,
    },
]
exports.seed = (knex) => knex('groups').del().then(() => knex('groups').insert(groups));
