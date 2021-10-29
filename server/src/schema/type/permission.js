const { gql } = require("apollo-server-core");
module.exports = gql`
  type Permission {
    id: Int
    name: String
    description: String
  }
`;
