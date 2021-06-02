const router = require("express").Router();
const { User } = require("../../../models");

// GET all users
router.get("/", (req, res) => {
  User.findAll()
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET users flashcards

// POST create a new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
