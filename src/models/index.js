const User = require("./User");
const Flashcard = require("./Flashcard");

// Products belongsTo Category
Flashcard.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  Flashcard,
  User,
};
