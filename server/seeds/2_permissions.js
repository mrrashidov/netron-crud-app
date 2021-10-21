const permissions = [
    {
        name: "read:permission",
        description: "Yu can read permission"
    },
    {
        name: "write:permission",
        description: "Yu can write permission"
    },
    {
        name: "create:permission",
        description: "Yu can create permission"
    },
    {
        name: "delete:permission",
        description: "Yu can delete permission"
    },

    {
        name: "read:user",
        description: "Yu can read user"
    },
    {
        name: "write:user",
        description: "Yu can write user"
    },
    {
        name: "create:user",
        description: "Yu can create user"
    },
    {
        name: "delete:user",
        description: "Yu can delete user"
    },

    {
        name: "read:role",
        description: "Yu can read role"
    },
    {
        name: "write:role",
        description: "Yu can write role"
    },
    {
        name: "create:role",
        description: "Yu can create role"
    },
    {
        name: "delete:role",
        description: "Yu can delete role"
    },

    {
        name: "read:group",
        description: "Yu can read group"
    },
    {
        name: "write:group",
        description: "Yu can write group"
    },
    {
        name: "create:group",
        description: "Yu can create group"
    },
    {
        name: "delete:group",
        description: "Yu can delete group"
    },

    {
        name: "read:tag",
        description: "Yu can read tag"
    },
    {
        name: "write:tag",
        description: "Yu can write tag"
    },
    {
        name: "create:tag",
        description: "Yu can create tag"
    },
    {
        name: "delete:tag",
        description: "Yu can delete tag"
    },

    {
        name: "read:category",
        description: "Yu can read category"
    },
    {
        name: "write:category",
        description: "Yu can write category"
    },
    {
        name: "create:category",
        description: "Yu can create category"
    },
    {
        name: "delete:category",
        description: "Yu can delete category"
    },

    {
        name: "read:todo",
        description: "Yu can read todo"
    },
    {
        name: "write:todo",
        description: "Yu can write todo"
    },
    {
        name: "create:todo",
        description: "Yu can create todo"
    },
    {
        name: "delete:todo",
        description: "Yu can delete todo"
    }
]
exports.seed = (knex) => knex('permissions').del().then(() => knex('permissions').insert(permissions));
