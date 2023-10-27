'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
    }

    get titleName() {
        let value = "";
        if(this.gender === "Female") {
          value = `Ms. ${this.name}`
        }
        else if(this.gender === "Male") {
          value = `Mr. ${this.name}`
        }
        return value;
      }
  }
  Profile.init({
    name: DataTypes.STRING,
    bio: DataTypes.STRING,
    gender: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};