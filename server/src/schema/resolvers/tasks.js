const { user, todo, tag, userRole } = require("../../model");
const { status } = require("../../helpers/constants");
module.exports = {
  Subscription: {
    newTask: {},
  },
  Query: {
    user: (_, { id }) => user.findOne({ id }),
    users: () => user.all(),
    task: (_, { id }) => todo.findOne({ id }),
    tasks: () => todo.all(),
  },
  Mutation: {
    addTask: async (_, { input }) => {
      const taskId = await todo
        .store()
        .insert({
          user_id: input.user_id,
          title: input.title,
          description: input.description,
          date: input.date,
          status: status[input.status].id,
        })
        .then((res) => {
          const lastInsertId = res[0];
          return lastInsertId;
        });
      return await todo
        .all(null, [
          "todos.id",
          "todos.user_id",
          "todos.title",
          "todos.description",
          "todos.date",
          "todos.status",
          "todos.created_at",
        ])
        .where("todos.id", taskId)
        .then((response) => {
          const item = response[0];
          console.log(item);
          return {
            id: taskId,
            user_id: item.user_id,
            title: item.title,
            description: item.description,
            date: item.date,
            status: "active",
            created_at: item.created_at,
          };
        });
    },
    // addUser
    addTag: async (_, { input }) => {
      const tagsId = await tag
        .insert({
          user_id: input.user_id,
          name: input.name,
          color: input.color,
          status: status[input.status].id,
        })
        .then((res) => {
          const lastInsertId = res[0];
          return lastInsertId;
        });
      return await tag
        .all(null, [
          "tags.id",
          "tags.name",
          "tags.color",
          "tags.status",
          "tags.created_at",
        ])
        .where("tags.id", tagsId)
        .then((response) => {
          const item = response[0];
          console.log(item);
          return {
            id: item.id,
            name: item.name,
            color: item.color,
            status: "active",
            created_at: item.created_at,
          };
        });
    },
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

      return await user
        .find(
          { "users.id": resultId },
          (qb) => {
            qb.innerJoin(
              "users_role",
              "users_role.user_id",
              "users.id"
            ).innerJoin("roles", "users_role.role_id", "roles.id");
            return qb;
          },
          [
            "users.*",
            "roles.id as role_id",
            "roles.name as role_name",
            "roles.description as role_desc",
          ]
        )
        .first()
        .then((res) => ({
          ...res,
          status: Object.values(status).find(
            (val) => val.id === parseInt(res.status)
          ).name,
          role: {
            id: res.role_id,
            name: res.role_name,
            description: res.role_desc,
          },
        }));
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
        });
    },
  },
};
