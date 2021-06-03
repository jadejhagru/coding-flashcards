const { Flashcard } = require("../models");

const cardData = [];

const seedProducts = () => Flashcard.bulkCreate(cardData);

module.exports = seedProducts;
