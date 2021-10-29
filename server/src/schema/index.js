const taskTypeDefs = require("./type/task");
const tagTypeDefs = require("./type/tag");
const authTypeDefs = require("./type/auth");
const roleTypeDefs = require("./type/role");
const userTypeDefs = require("./type/user");
const permissionTypeDefs = require("./type/permission");
const taskResolvers = require("./resolvers/tasks");
const authResolvers = require("./resolvers/auth");
const tagResolvers = require("./resolvers/tag");
module.exports = {
  typeDefs: [
    taskTypeDefs,
    tagTypeDefs,
    authTypeDefs,
    roleTypeDefs,
    userTypeDefs,
    permissionTypeDefs,
  ],
  resolvers: [taskResolvers, authResolvers, tagResolvers],
};
