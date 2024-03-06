const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config');
const Consumer = require('./consumer');

const consumer = new Consumer();

const server = express();

server.listen(config.server.port, () => {
    console.log(`Server started at ${config.server.port}`)
})

consumer.consumeMessage().then(
    () => {
        console.log("Connection established");
    }
);