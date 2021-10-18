const { gql } = require("apollo-server-core");
module.exports = gql`
  type Users {
    first_name: String,
    email: String,
    role_id: Int
  }

  type Query {
    users: Users
  }
`;