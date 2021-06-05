const router = require("express").Router();
const { User, Flashcard } = require("../../../models");

// GET all users
router.get("/", (req, res) => {
  User.findAll()
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET all users cards
router.get("/:id", (req, res) => {
  User.findAll({
    where: {
      id: req.params.id,
    },
    include: {
      model: Flashcard,
    },
  })
    .then((UserData) => res.json(UserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get user id
router.get("/getid/:email", (req, res) => {
  console.log("req: " + req.params.email);
  User.findAll({
    where: {
      email: req.params.email,
    },
  })
    .then((data) => res.json(data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST create a new user
router.post("/", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
  })
    .then((userData) => res.json(userData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
