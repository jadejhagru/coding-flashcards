const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Flashcard extends Model {}

Flashcard.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    question: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "flashcard",
  }
);

module.exports = Flashcard;
