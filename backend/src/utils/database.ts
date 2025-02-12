import * as pg from "pg";
import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();
if (
  !process.env.db_name ||
  !process.env.db_user ||
  !process.env.db_password ||
  !process.env.db_host
) {
  console.log("The DB environment variables are not defined.");
  process.exit(1);
}

const sequelize = new Sequelize({
  database: process.env.db_name,
  username: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  dialect: "postgres",
  dialectModule: pg,
});

export { sequelize };
