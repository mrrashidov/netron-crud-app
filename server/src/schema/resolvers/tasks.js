const {user} = require("../../model");
const {todo} = require("../../model");
module.exports = {
    Query: {
        users: () => user.all(),
        user: (_, {id}) => user.findOne({id}),
        tasks: () => todo.all(),
        task: (_, {id}) => todo.findOne({id})
    },
};
