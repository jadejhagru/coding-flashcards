const router = require("express").Router();
const { Flashcard, User } = require("../../../models");

router.get("/", (req, res) => {
  Flashcard.findAll()
    .then((fc_data) => res.json(fc_data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET a single flashcard by its 'id'
router.get("/:id", (req, res) => {
  Flashcard.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((fc_data) => res.json(fc_data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST new flash card
router.post("/", (req, res) => {
  console.log("creating new flashcard...");
  console.log(req.body);
  Flashcard.create({
    question: req.body.question,
    answer: req.body.answer,
    userId: req.body.userId,
  })
    .then((fcData) => res.json(fcData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT update a flashcard
router.put("/:id", (req, res) => {
  Flashcard.update(
    {
      question: req.body.question,
      answer: req.body.answer,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((tagData) => {
      if (!tagData) {
        res.status(404).json({ message: "No Tag found with that ID." });
        return;
      }
      res.json(tagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE a tag by its `id` value
router.delete("/:id", (req, res) => {
  Flashcard.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((fcData) => {
      if (!fcData) {
        res.status(404).json({ message: "No flashcard found by that ID." });
        return;
      }
      res.json(fcData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
