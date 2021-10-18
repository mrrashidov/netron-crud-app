const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const express = require("express");
const { typeDefs, resolvers } = require("./src/schema");
const env = require("dotenv").config();

const port = process.env.PORT;

async function startApolloServer(port) {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginInlineTraceDisabled(),
      ApolloServerPluginLandingPageGraphQLPlayground({
        path: "/",
      }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/" });
  app.listen(port);
}

startApolloServer(port).then(() =>
  console.log(`🚀 Server ready at http://localhost:${port}/`)
);
