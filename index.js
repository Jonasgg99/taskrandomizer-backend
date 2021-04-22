const { ApolloServer, gql, UserInputError } = require('apollo-server')

const mongoose = require('mongoose')
const Category = require('./models/category')
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
  type Category {
    name: String!
  }

  type Task {
    name: String!
    category: String
  }

  type Query {
    allTasks: [Task!]!
    allCategories: [Category!]!
  }

  type Mutation {
    addTask(
      name: String!
      category: String
    ): Task
    addCategory(
      name:String!
    ): Category
  }
`

const resolvers = {
  Query: {
    allTasks: () => {
      return Task.find()
    },
    allCategories: () => {
      return Category.find()
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
      return newTask
    },
    addCategory: async (root, args) => {
      const newCategory = new Category({...args})
      try {
        await newCategory.save()
      } catch {
        throw new UserInputError(error.message)
      }
      return newCategory
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