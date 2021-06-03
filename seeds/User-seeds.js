const { User } = require("../models");

const userData = [
  {
    username: "bob",
    email: "oasdfoij@oiajasd.com",
  },
  {
    username: "jay.cutler",
    email: "oasdfoij@oiajasd.com",
  },
  {
    username: "greg.doucette",
    email: "oasdfoij@oiajasd.com",
  },
  {
    username: "random.guy",
    email: "oasdfoij@oiajasd.com",
  },
];

const seedProducts = () => User.bulkCreate(userData);

module.exports = seedProducts;
