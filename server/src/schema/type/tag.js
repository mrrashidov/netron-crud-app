const { gql } = require("apollo-server-core");
module.exports = gql`
  input DeleteTag {
    id: ID!
  }
  input TagInput {
    user_id: Int
    name: String!
    color: String
    status: StatusType
  }

  input UpdateInput {
    id: ID
    name: String
    color: String
  }

  type Tag {
    id: ID!
    user_id: Int
    name: String
    color: String
    status: StatusType
  }

  type TagSubscriber {
    mutation: String!
    data: Tag
  }

  type Query {
    tag(id: ID): Tag
    tags: [Tag]
  }

  type Mutation {
    addTag(input: TagInput): Tag
    updateTag(input: UpdateInput): Tag
    deleteTag(id: ID!): ID
  }

  type Subscription {
    tags: TagSubscriber
  }
`;
