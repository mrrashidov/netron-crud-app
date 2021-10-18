const { user } = require("../../model");
module.exports = {
  Query: {
    users: () => user.all(),
    user: (_, { id }) => user.findOne({ id }),
  },
};
