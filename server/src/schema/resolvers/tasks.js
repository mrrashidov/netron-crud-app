const { todo, userRole } = require("../../model");
const { status } = require("../../helpers/constants");
const { PubSub } = require("graphql-subscriptions");
const { ApolloError } = require("apollo-server-errors");
const pubsub = new PubSub();
module.exports = {
  Subscription: {
    tasks: {
      subscribe: () => {
        return pubsub.asyncIterator("tasks");
      },
    },
  },
  Query: {
    task: (_, { id }) => todo.findOne({ id }),
    tasks: () => todo.all(),
  },
  Task: {
    status: (parent) => "active",
    user_id: (parent) => parent.user_id,
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
        .then(async (response) => {
          const item = {
            mutation: "ADD_TASK",
            data: {
              id: taskId,
              user_id: response[0].user_id,
              title: response[0].title,
              description: response[0].description,
              date: response[0].date,
              status: "active",
              created_at: response[0].created_at,
            },
          };
          await pubsub.publish("tasks", { tasks: item });
          return item;
        });
    },
    updateTask: async (_, { input }) => {
      return todo.update(input, input.id).then(async (res) => {
        if (res === 1) {
          const task = await todo.findById(input.id);
          task.status = "active";
          await pubsub.publish("tasks", {
            tasks: {
              mutation: "UPDATE_TASK",
              data: task,
            },
          });
          return task;
        }
        throw new ApolloError("Item not found");
      });
    },
    deleteTask: async (_, { id }) => {
      return todo.delete(id).then(async (res) => {
        if (res === 1) {
          await pubsub.publish("tasks", {
            tasks: {
              mutation: "DELETE_TASK",
              data: { id },
            },
          });
          return id;
        }
      });
    },
  },
};
