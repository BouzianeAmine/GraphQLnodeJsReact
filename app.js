const express = require("express");
const parser = require("body-parser");
const graphqlhttp = require("express-graphql");
const {
    buildSchema
} = require('graphql');
const bcrypt = require("bcryptjs");
const port = 5000;
const app = express();
const mongoose = require("mongoose");
const Cours = require("./models/cours");
const User = require("./models/user");

app.use(parser.json());


app.use('/graphql', graphqlhttp({
    schema: buildSchema(`

        type Cours {
            _id: ID!
            title:String!
            note:String!
            date: String
        }

        type User{
            _id: ID!
            email: String!
            password: String
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
        }

        type RootMutation{
            createCours(coursinput: CoursInput): Cours
            createUser(userinput: UserInput) : User
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
                date: Date.now(),
                creator: '5cb8872a9c7dd55dc20ee193'
            })
            return cour.save().then(cour => {
                console.log(cour._doc);
                return {
                    ...cour._doc
                };
            }).catch(err => {
                console.error(err);
            });
        },

        createUser: (args) => {
            return User.findOne({
                    email: args.userinput.email
                }).then((user) => {
                    if (user) {
                        throw new Error("This mail is already used");
                    }
                    return bcrypt.hash(args.userinput.password, 12);
                })
                .then(hashedpass => {
                    const user = new User({
                        email: args.userinput.email,
                        password: hashedpass
                    });
                    return user.save();
                }).then(user => {
                    console.log(user._doc);
                    return {
                        ...user._doc,
                        password: null
                    }
                }).catch(err => console.log(err));

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