const sequelize = require('../config/connection');
const { Song } = require('../models');

const songData = require('./songData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Song.bulkCreate(songData)
  console.log("Songs has been seeded!")

  process.exit(0);
};

seedDatabase();
