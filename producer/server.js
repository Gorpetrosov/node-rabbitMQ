const express = require("express");
const dotenv = require('dotenv');
dotenv.config();
const config = require('./config');
const bodyParser = require('body-parser');
const Producer = require('./producer');

const producer = new Producer();

const server = express();
server.use(bodyParser.json('application/json'));
server.post('/produce-message', async (req, res, next) => {
   await producer.publishMessage(req.body.logType, req.body.message);
   res.send();
})

server.listen(config.server.port, () => {
    console.log(`Server started at ${config.server.port}`)
})