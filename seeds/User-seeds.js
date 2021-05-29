const { User } = require("../src/models");

const userData = [
  {
    username: "user1",
  },
  {
    username: "user2",
  },
  {
    username: "user3",
  },
  {
    username: "user4",
  },
];

const seedProducts = () => User.bulkCreate(userData);

module.exports = seedProducts;
