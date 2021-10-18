module.exports = {
  Query: {
    users: async (parent, args, {model, user}, info) => {
      const users = await model
      console.log(model)
      return users
    }
  },
};
