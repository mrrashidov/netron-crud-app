const Model = require("./Model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = class User extends Model {
  constructor(database) {
    super(database, "users");
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
    return jwt.sign(JSON.parse(JSON.stringify(user)), process.env.SECRET, {
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
};
