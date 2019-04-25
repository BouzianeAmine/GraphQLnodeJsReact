const express = require("express");
const parser = require("body-parser");
const graphqlhttp = require("express-graphql");
const resolvers = require("./graphql/resolvers");
const schema = require("./graphql/schema");
const is_sign = require("./middlewear/is-signin");
const cors = require("cors");
const port = 5000;
const app = express();

const mongoose = require("mongoose");

app.use(cors());
app.use(is_sign);
app.use(parser.json());
app.use(express.json());

app.use(
    "/graphql",
    graphqlhttp({
        schema: schema,
        rootValue: resolvers,
        graphiql: true
    })
);

app.get("/", (res, req, next) => {
    console.log("/");
});

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@courses-130w2.mongodb.net/test?retryWrites=true`
    )
    .then(() => {
        app.listen(port, () => {
            console.log("listennng on :", port);
        });
    })
    .catch(err => {
        console.log(err);
    });