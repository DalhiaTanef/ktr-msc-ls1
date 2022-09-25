const express = require("express")
const cors = require("cors")
const http = require("http")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

/* MIDDLEWARES */
app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const PORT = process.env.PORT || process.env.API_PORT

mongoose
    .connect(process.env.DB_URL)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Database connection failed. Server not started");
        console.error(err);
    });
