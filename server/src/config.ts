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
  BCRYPT_PEPPER,
  SALT_ROUNDS,
  JWT_SECRET,
} = process.env;

export default {
  port: PORT || 5000,
  host: MYSQL_HOST,
  dbPort: MYSQL_PORT,
  dbName: NODE_ENV === "dev" ? MYSQL_DB : MYSQL_DB_TEST,
  dbUser: MYSQL_USER,
  dbPassword: MYSQL_PASSWORD,
  pepper: BCRYPT_PEPPER,
  salt: SALT_ROUNDS,
  jwtSecret: JWT_SECRET,
};
