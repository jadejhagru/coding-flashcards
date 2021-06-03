const { Flashcard } = require("../models");

const cardData = [
  {
    question: "Q1: User 1",
    answer: "yes",
    user_id: 1,
  },
  {
    question: "Q2: User 1",
    answer: "yes",
    user_id: 1,
  },
  {
    question: "Q3: User 1",
    answer: "yes",
    user_id: 1,
  },
  {
    question: "Q1: User 2",
    answer: "yes",
    user_id: 2,
  },
  {
    question: "Q2: User 2",
    answer: "yes",
    user_id: 2,
  },
  {
    question: "Q1: User 3's only question?",
    answer: "yes",
    user_id: 3,
  },
];

const seedProducts = () => Flashcard.bulkCreate(cardData);

module.exports = seedProducts;
