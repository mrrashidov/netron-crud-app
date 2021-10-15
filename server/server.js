const { ApolloServer, gql } = require("apollo-server-express");
const {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { importSchema } = require('graphql-import');

const resolvers = {
  Query: {
    tasks: () => ({
      id: 1,
      name: "pazar",
      description: "pazar alışverisi",
      price: 100,
      select: "Price",
      status: true,
    }),
  },
};

async function startApolloServer(resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: importSchema("./graphql/schema/schema.graphql"),
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
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(resolvers);
