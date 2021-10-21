const roles = [
    {
        user_id:1,
        name: "Super Admin",
        description: "Super admin role"
    },
    {
        user_id:1,
        name: "Moderator",
        description: "Moderator role"
    },
    {
        user_id:1,
        name: "User",
        description: "User role"
    }
]
exports.seed = (knex) => knex('roles').del().then(() => knex('roles').insert(roles));
