//Importing Model and datatypes
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//Setting up new sequlize model for user
class User extends Model {
    //Adding a bcrypt to the password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }
  //Initializing the user
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8],
        },
      },
    },
    {
        //Adding hooks to hash the password created by user
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
      },
      //Freezing the table so that sequalize prevents it from renaming
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user',
    }
  );
  
  //Exports model User
  module.exports = User;
  