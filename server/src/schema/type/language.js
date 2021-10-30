const { gql } = require("apollo-server-core");

module.exports = gql`
  type Language {
    id: ID
    name: String
    slug: String
    default: Int
  }
  type Query {
    languages: [Language]
  }
`;
