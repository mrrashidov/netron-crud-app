const { todo, userRole } = require("../../model");
const { status } = require("../../helpers/constants");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();
module.exports = {
  Subscription: {
    newTask: {
      subscribe: () => {
        return pubsub.asyncIterator("newTask");
      },
    },
  },
  Query: {
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
          pubsub.publish("newTask", { newTask: item });
          // return pubsub.asyncIterator("newTask");
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
    deleteTask: async (_, { input }) => {
      await todo
        .delete(input.id)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(input);
    },
    updateTask: async (_, { input }) => {
      await todo.update(
        {
          title: input.title,
          description: input.description,
        },
        input.id
      );

      return await todo
        .all(null, [
          "todos.id",
          "todos.user_id",
          "todos.title",
          "todos.description",
          "todos.date",
        ])
        .where("todos.id", input.id)
        .then((res) => {
          return {
            id: res[0].id,
            user_id: res[0].user_id,
            title: res[0].title,
            description: res[0].description,
            date: res[0].date,
          };
        });
    },
  },
};
