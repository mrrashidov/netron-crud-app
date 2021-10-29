const { language } = require("../../model/index");

module.exports = {
  Query: {
    languages: () => language.all(),
  },
};
