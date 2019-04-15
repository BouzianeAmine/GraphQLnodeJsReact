const express = require("express");
const parser = require("body-parser");
const graphqlhttp = require("express-graphql");
const {
    buildSchema
} = require('graphql');
const port = 5000;
const app = express();
const mongoose = require("mongoose");
const Cours = require("./models/cours");
app.use(parser.json());


app.use('/graphql', graphqlhttp({
    schema: buildSchema(`

        type Cours {
            _id: ID!
            title:String!
            note:String!
            date: String
        }

        input CoursInput {
            title: String!
            note: String!
        }

        type RootQuery {
            cours:[Cours!]!
        }

        type RootMutation{
            createCours(coursinput: CoursInput): Cours

        }

        schema {
            query: RootQuery
            mutation:RootMutation
        }   
    `),
    rootValue: {
        cours: () => {
            return Cours.find().then(courses => {
                return courses.map(cours => {
                    return {
                        ...cours._doc,
                        _id: cours._doc._id.toString() //cette ligne est faites juste pour caster le id renvoie au debut ...cours_doc
                    }
                })
            }).catch(err => {
                console.log(err)
            });
        },

        createCours: (args) => {
            const cour = new Cours({
                title: args.coursinput.title,
                note: args.coursinput.note,
                date: Date.now()
            })
            return cour.save().then(res => {
                console.log(res);
            }).catch(err => {
                console.error(err);
            });
            return {
                ...cour._doc
            };
        }

    },

    graphiql: true

}));



app.get("/", (res, req, next) => {
    console.log("First get")
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@courses-130w2.mongodb.net/test?retryWrites=true`)
    .then(() => {
        app.listen(port, () => {
            console.log("listennng on :",
                port)
        });
    }).catch(err => {
        console.log(err);
    })