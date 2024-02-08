const { Kafka } = require("kafkajs");
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });
const { executeQuery } = require("./dataBase");

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      executeQuery(`INSERT INTO messages VALUE (${message.value.toString()})`);
    },
  });
};

module.exports = {
  run,
};
