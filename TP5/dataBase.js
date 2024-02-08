const mysql = require("mysql2/promise");

// Database Configuration Object
const config = {
  host: "localhost",
  user: "root",
  password: "enis",
  database: "kafka1",
};

// Connect to the MySQL Server
async function connect() {
  try {
    const connection = await mysql.createConnection(config);
    console.log("Connected to MySQL!");
    connection.execute(
      `CREATE TABLE IF NOT EXISTS messages ( id INTEGER PRIMARY KEY AUTO_INCREMENT, contenue TEXT NOT NULL )`,
      []
    );
    return connection;
  } catch (err) {
    console.error(err.message);
  }
}

// Initialize the database connection
let dbConnection;
connect()
  .then((connection) => {
    dbConnection = connection;
  })
  .catch((err) => {
    console.error(err.message);
  });

/**
 * Execute a raw SQL Query
 * @param {string} sql - Raw SQL Query String
 * @param {Array<any>} values - Array of Values to replace placeholders in the SQL string
 */
function executeQuery(sql, values) {
  return dbConnection.execute(sql, values);
}
//record each message
eachMessage: async ({ topic, partition, message }) => {
  try {
    await connection.execute("INSERT INTO messages (value) VALUES (?)", [
      message.value.toString(),
    ]);
    console.log("Message enregistré dans la base de données");
  } catch (error) {
    console.error(
      "Erreur lors de l'insertion du message dans la base de données :",
      error
    );
  }
};

// Additional helper functions such as createTable(), insertData(), etc., can be added below based on your requirements

module.exports = {
  executeQuery,
};
