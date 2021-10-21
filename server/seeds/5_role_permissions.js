function roleGenerator(role_id, permissionsCount) {
    const items = []
    for (let permissionsCountKey = 1; permissionsCountKey => permissionsCount; permissionsCountKey++) {
        items.push({
            role_id: role_id,
            permission_id: permissionsCountKey
        })
    }

    return items
}

exports.seed = (knex) => knex('role_permissions').del().then(() => knex('role_permissions').insert([
    ...roleGenerator(1, 28),
    ...roleGenerator(2, 20),
    ...roleGenerator(3, 10),
]));
