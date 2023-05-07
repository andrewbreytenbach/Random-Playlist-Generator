const User = require("./User")
const Song = require("./Song")

// Defining associations
User.hasMany(Song, {
    foreignKey: 'user_id',
  });
  
  Song.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
module.exports = {
    User,
    Song
}