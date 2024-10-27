import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
// Initialize a Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'postgre_next', 
    process.env.DB_USERNAME || 'postgres', 
    process.env.DB_PASSWORD || '123', {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432, // Default port for PostgreSQL is 5432
  dialect: 'postgres', // Specify the dialect being used
  logging: console.log, // Enable query logging. Use false to disable
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false, // Configure SSL if needed
  },
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
