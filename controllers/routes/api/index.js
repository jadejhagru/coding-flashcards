const router = require("express").Router();
const fcRoutes = require("./Flashcard-routes");
const userRoutes = require("./User-routes");

router.use("/flashcards", fcRoutes);
router.use("/users", userRoutes);

module.exports = router;
