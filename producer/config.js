
module.exports = {
    rabbitMQ: {
        hostname: process.env.AMQP_HOSTNAME || 'localhost',
        username: process.env.AMQP_USERNAME || 'guest',
        password: process.env.AMQP_PASSWORD || 'guest',
        port: process.env.AMQP_PORT || 5672,
        exchangeName: process.env.AMQP_ECHANGE_NAME || 'amq.direct',
        exchangeType: 'direct',
    },
    server: {
        port: 3000
    }
}