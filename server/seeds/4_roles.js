const { status } = require("../src/helpers/constants");
const roles = [
    {
        user_id:1,
        name: "Super Admin",
        description: "Super admin role",
        status: status.active.id
    },
    {
        user_id:1,
        name: "Moderator",
        description: "Moderator role",
        status: status.active.id
    },
    {
        user_id:1,
        name: "User",
        description: "User role",
        status: status.active.id
    }
]
exports.seed = (knex) => knex('roles').del().then(() => knex('roles').insert(roles));
