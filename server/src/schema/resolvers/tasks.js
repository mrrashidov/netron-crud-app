const { user, todo, todoTranslations, tag } = require("../../model");
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
          status: status[input.status].id,
        })
        .then(async (res) => {
          const lastInsertId = res[0];
          for await (let lang of input.languages) {
            await todo.store("todo_translations").insert({
              todo_id: lastInsertId,
              lang_id: lang.lang_id,
              title: lang.title,
              description: lang.description,
            });
          }
          return lastInsertId;
        });
      return await todo
        .all(null, [
          "todos.id",
          "todos.created_at",
          "todos.status",
          "todo_translations.lang_id",
          "todo_translations.title",
          "todo_translations.description",
        ])
        .innerJoin("todo_translations", "todos.id", "todo_translations.todo_id")
        .whereNot("todos.status", status.delete.id)
        .where("todos.id", taskId)
        .then((response) => {
          const item = response[0];
          console.log(item);
          return {
            id: item.id,
            status: "active",
            created_at: item.created_at,
            languages: [],
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
