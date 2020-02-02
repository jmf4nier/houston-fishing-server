const express = require("express");
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

require("dotenv").config();
const port = process.env.PORT || 5000;

// Create a new Express app
const app = express();

// Set up Auth0 configuration
const authConfig = {
    domain: "dev-rl-uenl4.auth0.com",
    audience: "https://jasonserverhoustonfishing.herokuapp.com"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-rl-uenl4.auth0.com
const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
    }),

    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithm: ["RS256"]
});

// Define an endpoint that must be called with an access token
app.get("/api/external", checkJwt, (req, res) => {
    res.send({
        msg: "I am your server"
    });
});
app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    dbName: "houston_fishing"
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});
app.get('/lakes', (req, res)=>{
    res.send
})
const lakesRouter = require("./routes/lakes.js")
// const usersRouter = require("./routes/users.js")
// const messagesRouter = require("./routes/messages.js")

app.use("/lakes", lakesRouter);
// app.use("/users", usersRouter);
// app.use("/messages", messagesRouter);

// Start the app
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

