//Importing Model and datatypes
const { Model, DataTypes } = require('sequelize');

//Importing sequelize instance from connection.js
const sequelize = require('../config/connection');

//Defining the Song class which extends from the Model class
class Song extends Model {};

Song.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          title: {
            type: DataTypes.STRING,
            allowNull: false
          },
          artist: {
            type: DataTypes.STRING,
            allowNull: false
          },
          year: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
          genre: {
            type: DataTypes.STRING,
            allowNull: false
          },
          length: {
            type: DataTypes.INTEGER,
            // allowNull: false
          },
    },
    {//Freezing the table so that sequalize prevents it from renaming
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'song',  
    }
)
//Exporting the Song model
module.exports = Song;