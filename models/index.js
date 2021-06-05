const User = require("./User");
const Flashcard = require("./Flashcard");

// Products belongsTo Category
Flashcard.belongsTo(User);
User.hasMany(Flashcard);

module.exports = {
  Flashcard,
  User,
};
