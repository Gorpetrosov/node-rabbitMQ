
//1 - connect to rabbitmq server
//2 - create new channel on that connection
//3 - create exchange
//4 - publish the message to the exchange with a routing key

const ampq = require('amqplib');
const config = require('./config');

class Producer {
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


    async publishMessage(routingKey, message){
      if(!this.#channel) {
        await this.#createChannel();
      }
      const exchangeName = config.rabbitMQ.exchangeName;
      await this.#channel.assertExchange(exchangeName, config.rabbitMQ.exchangeType);
      const logDetails = {
          logType: routingKey,
          message,
          dateTime: new Date(),
      }
      await this.#channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(logDetails)));

        console.log(`The message ${message} is sent to exchange ${exchangeName}`)
    }
}

module.exports = Producer;