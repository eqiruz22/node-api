import mysql from "mysql2/promise";

const config = {
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const db = async () => {
  try {
    const connection = await mysql.createConnection(config);
    console.log("connect to database");
    return connection;
  } catch (error) {
    console.log("error connected to database : ", error);
  }
};

export default db;
