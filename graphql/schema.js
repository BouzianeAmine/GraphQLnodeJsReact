const {
    buildSchema
} = require('graphql');
module.exports = buildSchema(`

        type Cours {
            _id: ID!
            title:String!
            note:String!
            date: String
            creator: User!
        }

        type User{
            _id: ID!
            email: String!
            password: String
            courses: [Cours!]
        }

        type AuthData {
            userId: ID!
            token: String!
        }
        
        input UserInput{
            email: String!
            password: String!
        }

        input CoursInput {
            title: String!
            note: String!
        }

        type RootQuery {
            cours:[Cours!]!
            login(email: String!, password: String!): AuthData!
        }

        type RootMutation{
            createCours(coursinput: CoursInput): Cours
            createUser(userinput: UserInput) : User
        }

        schema {
            query: RootQuery
            mutation:RootMutation
        }   
    `)