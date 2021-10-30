const { gql } = require("apollo-server-core");
module.exports = gql`
  input TagInput {
    user_id: Int
    name: String!
    color: String
    status: StatusType
  }

  type Tag {
    user_id: Int
    name: String!
    color: String
    status: StatusType
  }

  type Query {
    tag(id: ID): Tag
    tags: [Tag]
  }

  type Mutation {
    addTag(input: TagInput): Tag
  }
`;
