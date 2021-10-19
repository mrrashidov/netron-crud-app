const {user, todo} = require("../../model");
module.exports = {
    Query: {
        users: () => user.all(),
        user: (_, {id}) => user.findOne({id}),
        tasks: () => todo.all(),
        task: (_, {id}) => todo.findOne({id}),
    },
    Mutation: {
        addTask: (_, {input}) => {
            console.log(input)
        }
    }
};
