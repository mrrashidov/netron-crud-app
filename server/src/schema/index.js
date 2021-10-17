const taskTypeDefs = require('./type/tasks')
const taskResolvers = require('./resolvers/tasks')
module.exports = {
    typeDefs: [taskTypeDefs],
    resolvers: [taskResolvers]
}