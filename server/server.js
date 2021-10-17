const { ApolloServer, gql } = require("apollo-server-express");
const {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { typeDefs, resolvers } = require('./src/schema')

async function startApolloServer(port) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginInlineTraceDisabled(),
      ApolloServerPluginLandingPageGraphQLPlayground({
        path: "/",
      }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/" });
  await new Promise((resolve) => httpServer.listen({ port: port }, resolve));
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}

startApolloServer(4200);
