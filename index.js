const { ApolloServer, gql } = require('apollo-server')

const mongoose = require('mongoose')
const Task = require('./models/task')

const MONGODB_URI = '...'

console.log('connecting to ', MONGODB_URI);

//connect

const typeDefs = gql`
  type Task {
    name: String!
    category: String
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