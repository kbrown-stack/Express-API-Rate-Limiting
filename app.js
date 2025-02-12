const express = require("express");
const { connectToMongoDB } = require("./db");
const rateLimit = require("express-rate-limit");
const bookRoute = require("./routes/book")
const helmet = require('helmet');
require('dotenv').config();

const PORT = process.env.PORT;
console.log("PORT from .env:", process.env.PORT);



const app = express();

// Connecting to MongoDB instance
connectToMongoDB()

const limiter = rateLimit({
    windowMS: 0.2 * 60 * 1000, // this is less than a second
    max: 4, // This limits each IP to 4 request per windoms
    standardHeaders: true, // This returns rate limit info in the ratelimit headers
    legacyHeaders: false, // This disable the X- RateLimit -* headers

})

// For security ,i used helmet below. This Helps secure Express apps by setting HTTP response headers.
// app.use(helmet)

// Here below you apply the rate limit middleware to all request below

app.use(limiter)

// This Below apply the rate limiting middleware to API calls only
// app.use('/api', apiLimiter)

app.use(express.static('public'));
app.use(express.json());


app.use("/books",bookRoute)

app.get("/", (req,res) => {
    res.send("Welcome Home!")
})

app.listen(PORT, () => {
    console.log(`Server started successfully on PORT: http://localhost:${PORT}`)
});

