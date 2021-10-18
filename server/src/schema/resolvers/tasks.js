module.exports = {
  Query: {
    users: async (parent, args, {models, user}, info) => {
      const users = await models.user.all()
      console.log(models)
      return users
    }
  },
};
