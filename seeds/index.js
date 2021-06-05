const seedUsers = require("./User-seeds");
const seedFlashcards = require("./Flashcard-seeds");

const sequelize = require("../config/connection.js");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- USERS SYNCED -----\n");
  await seedUsers();
  console.log("\n----- CARDS SEEDED -----\n");
  await seedFlashcards();
  process.exit(0);
};

seedAll();
