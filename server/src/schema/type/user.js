const { gql } = require("apollo-server-core");
module.exports = gql`
  input UserInput {
    first_name: String
    last_name: String
    avatar: String
    email: String
    password: String
    status: StatusType
  }

  type User {
    id: ID
    first_name: String
    last_name: String
    avatar: String
    email: String
    status: StatusType!
    created_at: String
    role: UserRole
  }

  type Query {
    user(id: ID!): User
    users: [User]
  }

  type Mutation {
    addUser(input: UserInput): User
  }

  type Subscription {
    newUser: User!
  }
`;
