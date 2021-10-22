const {status} = require("../src/helpers/constants");
const tags = [
    {
        user_id: 1,
        name: "meet",
        color: "red",
        status: status.active.id
    },
    {
        user_id: 2,
        name: "visit",
        color: "yellow",
        status: status.active.id
    },
    {
        user_id: 3,
        name: "other",
        color: "blue",
        status: status.active.id
    },

]
exports.seed = (knex) => knex('tags').del().then(() => knex('tags').insert(tags));