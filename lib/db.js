import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


// Test connection once when starting the app
async function testConnection() {
    try {
      const connection = await pool.getConnection();
      console.log("✅ Database connected successfully");
      connection.release(); 
    } catch (error) {
      console.error("❌ Failed to connect to the database:", error);
    }
  }
  
  // Run the test
  testConnection();
  
  export const promisePool = pool;