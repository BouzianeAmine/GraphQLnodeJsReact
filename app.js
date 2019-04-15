const express = require("express");
const parser = require("body-parser");
const port = 5000;
const app = express();

app.use(parser.json());



app.listen(port, () => {
    console.log("listennng on :",
        port)
});

app.get("/", (res, req, next) => {
    console.log("First get")
})