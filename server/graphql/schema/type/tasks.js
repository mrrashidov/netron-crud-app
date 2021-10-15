const { gql } = require("apollo-server-core");
module.exports = gql`
  type Tasks {
    id: ID
    name: String
    description: String
    price: Int
    select: String
    status: Boolean
  }

  type Query {
    task(id:ID!): Task
    tasks(id:ID): [Tasks]
  }

  type Mutation {
    addTask(id: ID): String
  }
`;
