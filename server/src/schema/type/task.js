const { gql } = require("apollo-server-core");
module.exports = gql`
  enum StatusType {
    active
    passive
    block
    delete
    complete
    pending
  }

  input StoreTask {
    user_id: ID!
    title: String!
    description: String
    date: String
    status: StatusType = "active"
  }

  input DeleteInput {
    id: ID!
  }

  input UpdateInput {
    id: ID!
    user_id: ID
    title: String
    description: String
    date: String
    status: StatusType
  }

  type Task {
    id: ID!
    user_id: ID
    title: String
    description: String
    date: String
    status: StatusType
    created_at: String
  }

  type TaskSubscriber {
    mutation: String!
    data: Task
  }
  type Query {
    task(id: ID!, lang: String!): Task
    tasks: [Task]
  }

  type Mutation {
    addTask(input: StoreTask!): Task
    deleteTask(id: ID!): ID
    updateTask(input: UpdateInput!): Task
  }

  type Subscription {
    tasks: TaskSubscriber
  }
`;
