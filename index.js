const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Task = require('./models/task')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack2020@cluster0.thypf.mongodb.net/taskerbackendtest?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

console.log('connecting to ', MONGODB_URI);

//connect

const typeDefs = gql`
  type Task {
    name: String!
    category: String
  }

  type Query {
    allTasks: [Task!]!
  }

  type Mutation {
    addTask(
      name: String!
      category: String
    ): Task
  }
`

const resolvers = {
  Query: {
    allTasks: () => {
      return Task.find()
    }
  },
  Mutation: {
    addTask: async (root, args) => {
      const newTask = new Task({...args})
      try {
        await newTask.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }
      return new Task({...args}).save()
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})