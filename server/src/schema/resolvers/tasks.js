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
    id: (task) => task.id,
    user_id: (parent) => parent.user_id,
    title: (task) => task.title,
    description: (task) => task.description,
    status: (parent) => "active",
  },
  Mutation: {
    addTask: async (_, { input }) => {
      input.status = input.status ? status[input.status].id : status.active.id;
      input.date = input.date ? input.date : new Date(Date.now());

      return todo.store(input).then(async (res) => {
        const findLastInsertItem = await todo.findById(res[0]);
        findLastInsertItem.status = "active";
        const item = {
          mutation: "ADD_TASK",
          data: findLastInsertItem,
        };
        await pubsub.publish("tasks", { tasks: item });
        return findLastInsertItem;
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
