const { gql } = require("apollo-server-core");
module.exports = gql`
  type Hello {
    message: String
  }

  type Query {
    hello: Hello
  }
`;