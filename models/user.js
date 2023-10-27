'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, {
        foreignKey: 'UserId'
      });

      User.hasOne(models.Profile, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: "Please input email"
        },
        notEmpty: {
          args: true,
          msg: "Please input email"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please input password"
        },
        notEmpty: {
          args: true,
          msg: "Please input password"
        },
        invalidLength(value) {
          if(value.length < 8) {
             throw new Error('Password length minimum is 8');
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Please select role"
        },
        notEmpty: {
          args: true,
          msg: "Please select role"
        }
      }
    }
    
  }, {
    hooks :{
      beforeCreate(instance, options) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(instance.password, salt); 

        instance.password = hash;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};