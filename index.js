const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Task {
    name: String!
    category: String
    recurring: String
    lastCompleted: String
  }
`

const resolvers = {

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})