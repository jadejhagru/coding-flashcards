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

module.exports = router;

/* AUTH0 + 
  //res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
  // Fetch data from BACKEND API
  // res.render to pass it to the front end handlebars stuff
  fetch(`http://localhost:3001/api/flashcards/cardsbyuserid/1`)
    .then((response) => response.json())
    .then((data) => {
      const CombineData = {
        authStatus: req.oidc.isAuthenticated(),
        fetchedData: data[0],
      };

      console.log("API Fetch Success:", CombineData);
      res.render("login", CombineData);
    });
    
    const userProfile = {
      given_name: "Jon",
      family_name: "Waaler",
      nickname: "jon.waaler",
      name: "Jon Waaler",
      picture:
      "https://lh3.googleusercontent.com/a/AATXAJxRX9Tpu-BJ0KoGO3ytlNzKeCxAIPy9pYX3oKSw=s96-c",
      locale: "en",
      updated_at: "2021-06-02T16:47:13.541Z",
      email: "jon.waaler@ontariotechu.net",
      email_verified: true,
      sub: "google-oauth2|116923808830600261189",
    };
    
*/
