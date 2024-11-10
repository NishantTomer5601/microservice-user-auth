const db = require('../config/dbConfig');

const migrate = async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Database migration completed successfully.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    db.end(); // Close the database connection after migration
  }
};

migrate();
