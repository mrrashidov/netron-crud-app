const Model = require("./Model");
export class User extends Model {
  constructor(database) {
    super(database, "users");
  }
  async getUsers() {
    return this.database("users").select();
  }
}
