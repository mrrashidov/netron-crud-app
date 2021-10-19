const { gql } = require("apollo-server-core");
module.exports = gql`
  type User {
    first_name: String
    email: String
    role_id: Int
  }
  
  type Task {
    header: String
    description: String
  }

  type Query {
    user(id: ID!): User
    users: [User]
    task(id: ID!): Task  
    tasks: [Task]
  }
`;
