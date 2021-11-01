const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginInlineTraceDisabled, ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core')
const express = require('express')
const { typeDefs, resolvers } = require('./src/schema')
const env = require('dotenv').config()
const models = require('./src/model/index')

const port = process.env.PORT

const getUser = async (req, connection) => {
	let user = null
	if (req && req.headers.authorization) {
		const token = req.headers.authorization.replace('Bearer ', '')
		user = await models.user.getUserByToken(token)
		console.log(user)
	} else if (connection && connection.context.Authorization) {
		const token = connection.context.Authorization.replace('Bearer ', '')
		user = await models.user.getUserByToken(token)
		console.log(user)
	}
	return user
}

async function startApolloServer(port) {
	const app = express()
	const httpServer = createServer(app)
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req, res, connection }) => {
			return {
				models,
				user: await getUser(req, connection)
			}
		},
		plugins: [
			ApolloServerPluginInlineTraceDisabled(),
			ApolloServerPluginCacheControlDisabled(),
			ApolloServerPluginInlineTraceDisabled(),
			ApolloServerPluginLandingPageGraphQLPlayground(),
			ApolloServerPluginDrainHttpServer({ httpServer })
		]
	})
	await server.start()
	server.applyMiddleware({ app, path: '/' })
	httpServer
		.listen(port, () => {
			new SubscriptionServer(
				{
					execute,
					subscribe,
					schema
				},
				{
					server: httpServer,
					path: '/graphql'
				}
			)
		})
		.on('listening', () => {
			console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
			console.log(`🚀 Subscriptions ready at ws://localhost:${port}`)
		})
}

startApolloServer(port)
