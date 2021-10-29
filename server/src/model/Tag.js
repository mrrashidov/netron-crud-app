const Model = require("./Model");

module.exports = class Tag extends Model {
  constructor(database) {
    super(database, "tags");
  }

  async getTags() {
    return this.database("tags").select();
  }
};
