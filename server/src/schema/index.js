const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const taskTypeDefs = require("./type/task");
const tagTypeDefs = require("./type/tag");
const authTypeDefs = require("./type/auth");
const roleTypeDefs = require("./type/role");
const userTypeDefs = require("./type/user");
const languageTypeDefs = require("./type/language");
const permissionTypeDefs = require("./type/permission");
const taskResolvers = require("./resolvers/tasks");
const authResolvers = require("./resolvers/auth");
const tagResolvers = require("./resolvers/tag");
const languageResolvers = require("./resolvers/language");

const resolvers = mergeResolvers([
  taskResolvers,
  authResolvers,
  tagResolvers,
  languageResolvers,
]);
const typeDefs = mergeTypeDefs([
  taskTypeDefs,
  tagTypeDefs,
  authTypeDefs,
  roleTypeDefs,
  userTypeDefs,
  languageTypeDefs,
  permissionTypeDefs,
]);
module.exports = makeExecutableSchema({
  resolvers,
  typeDefs,
});
