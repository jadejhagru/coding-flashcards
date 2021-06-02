// both the sql and handlebars need express
const express = require("express");

// give ability to fetch on node server
const fetch = require("node-fetch");

// Handlebars
const exphbs = require("express-handlebars");

// Database/sql stuff
const routes = require("./controllers/routes");
const sequelize = require("./config/connection");

const path = require("path");

// Auth0
const { auth } = require("express-openid-connect");
//auth0
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.AUTH0_CLIENT_SECRET,
};
// auth0 display profile
const { requiresAuth } = require("express-openid-connect");

// Express init
const app = express();
const PORT = process.env.PORT || 3001;

app.use(auth(config));

// AUTH0 Routes
app.get("/", (req, res) => {
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
      res.render("index", CombineData);
    });
});
// auth0 show profile data
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

// Database routes below
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serve css
app.use(express.static(path.join(__dirname, "public")));

// Sets Handlebars as the default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database routes
app.use("/api", routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App hosted on: http://localhost:${PORT}/`)
  );
});
