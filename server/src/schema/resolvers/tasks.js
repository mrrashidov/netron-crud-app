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
  },
};
