// auth0 display profile
const { requiresAuth } = require("express-openid-connect");
const router = require("express").Router();
const { User, Flashcard } = require("../../models");

// HOME/AUTH0 Login Route
router.get("/", (req, res) => {
  // Creating a dataobject that will be passed through 'res.render'
  const authData = {
    isAuthenticated: req.oidc.isAuthenticated(),
    userProfile: req.oidc.user,
  };

  // if authenticate, check if new user
  if (req.oidc.isAuthenticated()) {
    // check if user is already in database
    User.findAll({
      where: {
        email: req.oidc.user.email,
      },
    })
      .then((userData) => {
        console.log(`--Checking if new user`);
        console.log(userData);
        if (userData.length === 0) {
          console.log(`--Registering new user: ${req.oidc.user.email}`);

          User.create({
            username: req.oidc.user.nickname,
            email: req.oidc.user.email,
          }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
        } else {
          console.log(`--Found returning user: ${req.oidc.user.email}`);
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

  // Render login handlebars to the {{{body}}}
  res.render("login", authData);
});

/* auth0 show profile data (NO USE ATM)*/
router.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
