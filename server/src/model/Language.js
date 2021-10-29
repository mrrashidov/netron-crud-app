const Model = require("./Model");

module.exports = class Language extends Model {
  constructor(database) {
    super(database, "languages");
  }

  async getLanguages() {
    return this.database("todos").select();
  }
};
