const express = require("express");
const app = express();
const producer = require("./producer");
const consumer = require("./consumer");
const { executeQuery } = require("./dataBase");

producer.run().catch(console.error);
consumer.run().catch(console.error);

app.get("/messages", async (req, res) => {
  try {
    const [rows] = await executeQuery("SELECT * FROM messages");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000");
});
