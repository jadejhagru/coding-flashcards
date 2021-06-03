const { Flashcard } = require("../models");

const cardData = [
  {
    question: "Q1: User 1",
    answer: "yes",
  },
  {
    question: "Q2: User 1",
    answer: "yes",
  },
  {
    question: "Q3: User 1",
    answer: "yes",
  },
  {
    question: "Q1: User 2",
    answer: "yes",
  },
  {
    question: "Q2: User 2",
    answer: "yes",
  },
  {
    question: "Q1: User 3's only question?",
    answer: "yes",
  },
];

const seedProducts = () => Flashcard.bulkCreate(cardData);

module.exports = seedProducts;
