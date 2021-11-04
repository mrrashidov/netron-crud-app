const { tag } = require("../../model/index");
const { status } = require("../../helpers/constants");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

module.exports = {
  Subscription: {
    newTag: {
      subscribe: () => {
        return pubsub.asyncIterator("newTag");
      },
    },
  },
  Query: {
    tags: () => tag.all(),
  },
  Mutation: {
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
          "tags.user_id",
          "tags.name",
          "tags.color",
          "tags.status",
          "tags.created_at",
        ])
        .where("tags.id", tagsId)
        .then((response) => {
          const item = response[0];
          pubsub.publish("newTag", { newTag: item });
          return {
            id: item.id,
            user_id: item.user_id,
            name: item.name,
            color: item.color,
            status: "active",
            created_at: item.created_at,
          };
        });
    },
    deleteTag: async (_, { input }) => {
      await tag.delete(input.id);
    },
  },
};
