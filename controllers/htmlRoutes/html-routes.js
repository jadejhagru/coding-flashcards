// auth0 display profile
const { requiresAuth } = require("express-openid-connect");
const router = require("express").Router();
const { User, Flashcard } = require("../../models");

// Create cards page
router.get("/createcards", requiresAuth(), (req, res) => {
  User.findAll({
    where: {
      email: req.oidc.user.email,
    },
    include: {
      model: Flashcard,
    },
  })
    .then((userData) => {
      // Package data together
      const dataPackage = {
        userProfile: req.oidc.user,
        user: userData,
      };

      res.render("createcards", dataPackage);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Start studying page
router.get("/study", requiresAuth(), (req, res) => {
  User.findAll({
    where: {
      email: req.oidc.user.email,
    },
    include: {
      model: Flashcard,
    },
  })
    .then((userData) => {
      // Package data together
      const dataPackage = {
        userProfile: req.oidc.user,
        user: userData,
      };

      res.render("study", dataPackage);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
