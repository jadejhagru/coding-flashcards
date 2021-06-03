// auth0 display profile
const { requiresAuth } = require("express-openid-connect");
const router = require("express").Router();

// HOME/AUTH0 Login Route
router.get("/", (req, res) => {
  const authData = {
    isAuthenticated: req.oidc.isAuthenticated(),
    userProfile: req.oidc.user,
  };

  res.render("login", authData);
});
// auth0 show profile data
router.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
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
