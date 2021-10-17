const { gql } = require("apollo-server-core");
module.exports = gql`
  type Task {
    id: ID
    name: String
    description: String
    price: Int
    select: String
    status: Boolean
  }

  type Query {
    task(id:ID!): Task
    tasks(id:ID): [Task]
  }

  type Mutation {
    addTask(id: ID): Task
  }
`;
