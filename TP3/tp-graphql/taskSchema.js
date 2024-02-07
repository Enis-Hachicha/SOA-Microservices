// taskSchema.js

const { buildSchema } = require('graphql');

const taskSchema = buildSchema(`
    type Task {
        id: ID!
        title: String!
        description: String!
        completed: Boolean!
        duration: Int!
    }
    type Query {
        task(id: ID!): Task
        tasks: [Task]
    }
    type Mutation {
        addTask(title: String!, description: String!, completed: Boolean!, duration: Int!): Task
        completeTask(id: ID!): Task
        changeDescription(id: ID!, newDescription: String!): Task
    }
`);

module.exports = taskSchema;