const Model = require("./Model");
module.exports = class Role extends Model {
  constructor(database) {
    super(database, "roles");
  }

  getRole(id) {
    return this.database("roles")
      .select(
        "roles.id",
        "roles.name",
        "roles.description",
        "permissions.id as p_id",
        "permissions.name as p_name",
        "permissions.description as p_desc"
      )
      .where({ "roles.id": id })
      .innerJoin("role_permissions", "roles.id", "role_permissions.role_id")
      .innerJoin(
        "permissions",
        "role_permissions.permission_id",
        "permissions.id"
      );
  }
};
