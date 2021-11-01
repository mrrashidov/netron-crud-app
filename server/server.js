const { ApolloServer } = require("apollo-server-express");
const {
  ApolloServerPluginInlineTraceDisabled,
  ApolloServerPluginCacheControlDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginDrainHttpServer,
} = require("apollo-server-core");
const express = require("express");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const schema = require("./src/schema");
const env = require("dotenv").config();
const models = require("./src/model/index");
const { SubscriptionServer } = require("subscriptions-transport-ws");

const port = process.env.PORT;

const getUser = async (req, connection) => {
  let user = null;
  if (req && req.headers.authorization) {
    const token = req.headers.authorization.replace("Bearer ", "");
    user = await models.user.getUserByToken(token);
    console.log(user);
  } else if (connection && connection.context.Authorization) {
    const token = connection.context.Authorization.replace("Bearer ", "");
    user = await models.user.getUserByToken(token);
    console.log(user);
  }
  return user;
};

async function startApolloServer(port) {
  const app = express();
  const httpServer = createServer(app);
  const server = new ApolloServer({
    schema,
    context: async ({ req, res, connection }) => {
      return {
        models,
        user: await getUser(req, connection),
      };
    },
    plugins: [
      ApolloServerPluginInlineTraceDisabled(),
      ApolloServerPluginCacheControlDisabled(),
      ApolloServerPluginInlineTraceDisabled(),
      ApolloServerPluginLandingPageGraphQLPlayground(),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app, path: "/" });
  httpServer
    .listen(port, () => {
      new SubscriptionServer(
        {
          execute,
          subscribe,
          schema,
        },
        {
          server: httpServer,
          path: "/",
        }
      );
    })
    .on("listening", () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
      );
      console.log(`🚀 Subscriptions ready at ws://localhost:${port}`);
    });
}

startApolloServer(port);
