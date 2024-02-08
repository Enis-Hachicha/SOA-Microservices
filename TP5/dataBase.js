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
      `CREATE TABLE IF NOT EXISTS personnes ( id INTEGER PRIMARY KEY AUTO_INCREMENT, nom TEXT NOT NULL, address TEXT NOT NULL )`,
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

// Additional helper functions such as createTable(), insertData(), etc., can be added below based on your requirements

module.exports = {
  executeQuery,
};