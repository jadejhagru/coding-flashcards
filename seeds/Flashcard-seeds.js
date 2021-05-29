const { Flashcard } = require("../src/models");

const cardData = [
  {
    question: "Q1: How do you jump?",
    answer: "Use legs",
    user_id: 1,
  },
  {
    question: "Q2: How do you jump?",
    answer: "Use legs",
    user_id: 1,
  },
  {
    question: "Q3: How do you jump?",
    answer: "Use legs",
    user_id: 1,
  },
  {
    question: "Q1: How do you jump?",
    answer: "Use legs",
    user_id: 2,
  },
  {
    question: "Q2: How do you jump?",
    answer: "Use legs",
    user_id: 2,
  },
  {
    question: "Q1: How do you jump?",
    answer: "Use legs",
    user_id: 3,
  },
];

const seedProducts = () => Flashcard.bulkCreate(cardData);

module.exports = seedProducts;
