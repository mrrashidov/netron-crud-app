const {gql} = require("apollo-server-core");
module.exports = gql`
    enum StatusType {
        active
        passive
        block
        delete
        complete
        pending
    }

    input StoreTask {
        user_id: ID!
        title: String!
        description: String
        status: StatusType!
    }

    input UserInput {
        first_name: String
        last_name: String
        avatar: String
        email: String
        password: String
        status: StatusType
    }
    
    input TagInput {
        user_id: Int
        name: String!
        color: String
        status: StatusType
    }

    input LoginInput {
        email: String
        password: String
    }

    type Token {
        email: String
        token: String
    }
    
    type Tag {
        user_id: Int
        name: String!
        color: String
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
    }

    type Task {
        id: ID!
        title: String
        description: String
        status: StatusType
        created_at: String!
    }

    type TaskTranslation {
        id: ID
        title:String
        description:String
    }

    type TaskItem {
        id: ID,
        user_id: ID,
        title: String
        description: String
        status: StatusType
        created_at: String
    }
    
    type Query {
        user(id: ID!): User
        users: [User]
        task(id: ID! lang: String!): Task
        tasks(lang:String!): [Task]
        tag(id: ID): Tag
        tags: [Tag]
    }
    
    type Mutation {
        addTask(input: StoreTask): TaskItem
        addUser(input: UserInput): User
        loginUser(input: LoginInput): Token
        addTag(input: TagInput): Tag
    }
`;
