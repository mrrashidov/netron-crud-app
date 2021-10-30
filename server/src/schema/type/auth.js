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

  input LoginInput {
    email: String
    password: String
  }

  type Token {
    id: ID
    first_name: String
    last_name: String
    avatar: String
    status: StatusType
    created_at: String
    email: String
    token: String
  }

  type Mutation {
    loginUser(input: LoginInput): Token
  }
`;
