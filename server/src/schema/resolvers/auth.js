const { user, userRole } = require("../../model/index");
const { status } = require("../../helpers/constants");

module.exports = {
  Query: {
    user: (_, { id }) => user.findOne({ id }),
    users: () => user.all(),
  },
  Mutation: {
    addUser: async (_, { input }) => {
      const { first_name, last_name, avatar, email, password } = input;
      const isUser = await user.findOne({ email });
      if (isUser) {
        throw new Error("Email already");
      }
      const hash = await user.hash(password);
      const resultId = await user.insert({
        first_name: first_name,
        last_name: last_name,
        avatar: avatar,
        email: email,
        status: status[input.status].id,
        password: hash,
      });

      const roleId = await userRole.insert({
        user_id: resultId,
        role_id: 3,
      });

      return await user.get(resultId);
    },
    loginUser: async (_, { input }) => {
      const { email, password } = input;
      const isUser = await user.findOne({ email });

      if (!isUser) {
        throw new Error("Invalid credentials");
      }
      if (!(await user.compare(isUser.password, password))) {
        throw new Error("Invalid credentials");
      }

      return await user
        .all(null, [
          "users.id",
          "users.first_name",
          "users.last_name",
          "users.avatar",
          "users.email",
          "users.status",
          "users.created_at",
        ])
        .where("users.email", email)
        .then((res) => {
          const item = res[0];
          console.log(item);
          return {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            avatar: item.avatar,
            status: "active",
            created_at: item.created_at,
            email: email,
            password: password,
            token: user.generateToken(isUser),
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
