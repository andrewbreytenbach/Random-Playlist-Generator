const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
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

module.exports = sequelize;
