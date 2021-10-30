const Model = require("./Model");
const Role = require("./role");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = class User extends Model {
  constructor(database) {
    super(database, "users");
    this.role = new Role(database);
  }
  async hash(password) {
    return bcrypt.hash(password, 10);
  }
  async compare(hash, password) {
    return bcrypt.compare(password, hash);
  }

  generateToken(user) {
    /* knex return a RowDataPacket object and jwt.sign function
      expects a plain object, stringify and parse it back does the trick */
    return jwt.sign(JSON.parse(JSON.stringify(user)), "secretKey", {
      expiresIn: 86400,
    });
  }

  async getUserByToken(token) {
    try {
      const decoded = jwt.verify(token, "secretKey");
      return decoded;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUsers() {
    return this.database("users").select();
  }

  async get(id) {
    let user = await this.database("users")
      .select(["users.*", "users_role.role_id"])
      .where({ "users.id": id })
      .innerJoin("users_role", "users_role.user_id", "users.id")
      .first();
    const user_role = await this.role.getRole(user.role_id).then((res) => {
      return res.map((role) => {
        return {
          id: 1,
          name: "role name",
          description: "role descr",
          permissions: [],
        };
      });
    });

    console.log(user_role);
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      avatar: user.avatar,
      email: user.email,
      created_at: user.created_at,
      role: user_role,
    };
  }
};
