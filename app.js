const express = require("express");
const parser = require("body-parser");
const graphqlhttp = require("express-graphql");
const {
    buildSchema
} = require('graphql');
const port = 5000;
const app = express();

app.use(parser.json());


app.use('/graphql', graphqlhttp({
    schema: buildSchema(`

        type RootQuery {
            cours:[String!]!
        }

        type RootMutation{
            createCours(name:String): String

        }

        schema {
            query: RootQuery
            mutation:RootMutation
        }   
    `),
    rootValue: {
        cours: () => {
            return ['Math', 'Java', 'Anglais'];
        },

        createCours: (args) => {
            const name = args.name;
            return name;
        }

    },

    graphiql: true

}));

app.listen(port, () => {
    console.log("listennng on :",
        port)
});

app.get("/", (res, req, next) => {
    console.log("First get")
})