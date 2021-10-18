const { gql } = require("apollo-server-core");
module.exports = gql`
  type User {
    first_name: String
    email: String
    role_id: Int
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }
`;
