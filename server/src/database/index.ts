import mysql from "mysql2/promise";
import config from "../config";

// MySQL connection
const db = mysql.createConnection({
  host: config.host,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

const pool = mysql.createPool({
  host: config.host,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

async function connectToDB() {
  try {
    (await db).connect;
    console.log("MySQL connected...");
  } catch (error) {
    console.error("db connection error " + error);
  }
}

connectToDB();

export default db;

export { pool };
