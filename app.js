const Express = require("express");
const Mongoose = require("mongoose");
const Cors = require("cors");
const Bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let app=Express();

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});