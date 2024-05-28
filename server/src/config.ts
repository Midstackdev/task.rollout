import dotenv from "dotenv";

dotenv.config();

const {
  PORT,
  NODE_ENV,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DB,
  MYSQL_DB_TEST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  FLICKER_KEY,
  FLICKER_API_KEY,
  FLICKER_SECERT,
} = process.env;

export default {
  port: PORT || 5000,
  host: MYSQL_HOST,
  dbPort: MYSQL_PORT,
  dbName: NODE_ENV === "dev" ? MYSQL_DB : MYSQL_DB_TEST,
  dbUser: MYSQL_USER,
  dbPassword: MYSQL_PASSWORD,
  flikerKey: FLICKER_KEY ?? "",
  flikerApiKey: FLICKER_API_KEY ?? "",
  flikerSecret: FLICKER_SECERT,
};
