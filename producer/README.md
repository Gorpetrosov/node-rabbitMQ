# RabbitMQ Consumer

This project is a RabbitMQ consumer that listens for messages from a specified exchange and processes them accordingly.

## Getting Started

1. Create a `.env` file in the root directory of the project.
2. Copy the variables from `.example.env` into `.env`.
3. Fill in the credentials and configuration details in the `.env` file.
4. Run `npm install` to install the required dependencies.

## Usage

 `npm run start`

## request example
 1. info request
  `curl --location --request POST 'localhost:3000/produce-message' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "logType": "info",
  "message": "info message"
  }'`
2.  warning request
3. `curl --location --request POST 'localhost:3000/produce-message' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "logType": "warning",
    "message": "warning message"
    }'`
