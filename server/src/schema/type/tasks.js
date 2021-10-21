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
    input LanguageInput {
        lang_id:ID
        title: String
        description: String
    }
    input StoreTask {
        user_id: ID!
        languages: [LanguageInput!]!
        status: StatusType!
    }

    input UserInput {
        first_name: String
        email: String
        role_id: Int
    }
    
    type User {
        first_name: String
        email: String
        role_id: Int
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
        id: ID
        languages: TaskTranslation
        status: StatusType
        created_at: String
    }
    
    type Query {
        user(id: ID!): User
        users: [User]
        task(id: ID! lang: String!): Task
        tasks(lang:String!): [Task]
    }
    
    type Mutation {
        addTask(input: StoreTask): TaskItem
        addUser(input: UserInput): User
    }
`;
