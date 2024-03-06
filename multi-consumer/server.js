const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config');
const MultiConsumer = require('./multi-consumer');

const multiConsumer = new MultiConsumer();

const server = express();

server.listen(config.server.port, () => {
    console.log(`Server started at ${config.server.port}`)
})

multiConsumer.consumeMessage().then(
    () => {
        console.log("Connection established");
    }
);