const {user, todo} = require("../../model");
module.exports = {
    Query: {
        users: () => user.all(),
        user: (_, {id}) => user.findOne({id}),
        tasks: () => todo.all(),
        task: (_, {id}) => todo.findOne({id}),
    },
    Mutation: {
        addTask: async (_, {input}) => {
            console.log(input)
            const result = await todo.insert(input)
            return result
        }
    }
};
