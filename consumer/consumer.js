//1 - connect to rabbitmq server
//2 - create new channel
//3 - create exchange
//4 - create the queue
//5 - Bind the queue to the exchange
//6 - consume the message from the queue

const ampq = require('amqplib');
const config = require('./config');

class Consumer {
    #channel

    async #createChannel () {
        const connection = await ampq.connect({
            hostname: config.rabbitMQ.hostname,
            username: config.rabbitMQ.username,
            password: config.rabbitMQ.password,
            port: config.rabbitMQ.port,
        });
        this.#channel = await connection.createChannel();
    }

    async #createQueueAndConsumeMessage(exchangeName) {
        const queueObject = await this.#channel.assertQueue(config.rabbitMQ.infoQueueName);
        return this.#bindQueueAndConsume(queueObject,exchangeName);
    }

    async #bindQueueAndConsume(queueObject, exchangeName) {
        await this.#channel.bindQueue(queueObject.queue, exchangeName, config.rabbitMQ.infoRoutingKey);
        return new Promise(async (resolve) => {
            this.#channel.consume(queueObject.queue, async (msg) => {
                if (msg) {
                    await this.#acknowledgeOnSuccessMessage(msg)
                    await this.messageData(JSON.parse(msg.content));
                    return resolve(msg)
                }

            });

        })
    }

    async #acknowledgeOnSuccessMessage(queueMessage) {
        await this.#channel.ack(queueMessage);
        return true;
    }

    async messageData(message) {
        console.log({message})
    }


    async consumeMessage(){
        if(!this.#channel) {
            await this.#createChannel();
        }
        const exchangeName = config.rabbitMQ.exchangeName;
        await this.#channel.assertExchange(exchangeName, config.rabbitMQ.exchangeType);
        const jsonData = await this.#createQueueAndConsumeMessage(exchangeName);
        return  jsonData.content ? JSON.parse(jsonData.content): null;
    }
}

module.exports = Consumer;