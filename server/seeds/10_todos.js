const { status } = require("../src/helpers/constants");
const todos = [
    {
        user_id: 1,
        title: "business visit",
        description: "business visit",
        status: status.active.id,
    },
    {
        user_id: 2,
        title: "school visit",
        description: "school visit",
        status: status.active.id,
    },
    {
        user_id: 3,
        title: "other visit",
        description: "other visit",
        status: status.active.id,
    },

]
exports.seed = (knex) => knex('todos').del().then(() => knex('todos').insert(todos));