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
    status: StatusType!
  }

  type Task {
    id: ID!
    title: String
    description: String
    status: StatusType
    date: String
    created_at: String!
  }

  type TaskItem {
    id: ID
    user_id: ID
    title: String
    description: String
    date: String
    status: StatusType
    created_at: String
  }

  type Query {
    task(id: ID!, lang: String!): Task
    tasks: [Task]
  }

  type Mutation {
    addTask(input: StoreTask): TaskItem
  }

  type Subscription {
    newTask: Task
  }
`;
