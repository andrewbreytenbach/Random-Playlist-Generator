//Importing sequalize
const Sequelize = require('sequelize');
// Enable access to .env variables
require('dotenv').config();

let sequelize;
// Check if the JAWSDB_URL environment variable is defined
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Create a Sequelize instance using environment variables for database connection
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST || '127.0.0.1',
      dialect: 'mysql',
      port: process.env.DB_PORT || 3306,
      dialectOptions: {
        decimalNumbers: true,
      },
      define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
      },
    }
  );
}
// Export the created Sequelize instance for use in other modules
module.exports = sequelize;
