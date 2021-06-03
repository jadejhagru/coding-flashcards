const { User } = require("../models");

const userData = [
  {
    username: "bob",
  },
  {
    username: "jay.cutler",
  },
  {
    username: "greg.doucette",
  },
  {
    username: "random.guy",
  },
];

const seedProducts = () => User.bulkCreate(userData);

module.exports = seedProducts;
