const { gql } = require("apollo-server-core");
module.exports = gql`
  input UserRoleInput {
    user_id: ID
    user_role: Int
  }

  type UserRole {
    id: ID
    name: String
    description: String
    permissions: [String!]
  }

  type Mutation {
    addUserRole(input: UserRoleInput): UserRole
  }
`;
