const { user, todo, tag } = require("../../model");
const { status } = require("../../helpers/constants");
module.exports = {
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
        .where("users.id", resultId)
        .then((res) => {
          const item = res[0];
          console.log(item);
          return {
            id: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            avatar: item.avatar,
            email: item.email,
            status: "active",
            created_at: item.created_at,
          };
        });
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

      return {
        email: email,
        password: password,
        token: user.generateToken(isUser)
      }

     

      // const token = 
      // console.log(token)
      // return token
    },
  },
};
