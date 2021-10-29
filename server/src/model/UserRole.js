const Model = require("./Model");

module.exports = class UserRole extends Model {
  constructor(database) {
    super(database, "users_role");
  }
  async addRole() {
    return this.database("users_role").select();
  }
};
