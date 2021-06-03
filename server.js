// both the sql and handlebars need express
const express = require("express");

// Handlebars
const exphbs = require("express-handlebars");

// Database/sql stuff
const routes = require("./controllers/routes");
const authRoutes = require("./controllers/htmlRoutes/auth-routes");
const htmlRoutes = require("./controllers/htmlRoutes/html-routes");
const sequelize = require("./config/connection");
// for express static serve
const path = require("path");

// Auth0
const { auth } = require("express-openid-connect");

//auth0 config
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  secret: process.env.AUTH0_CLIENT_SECRET,
};

// Express init
const app = express();
const PORT = process.env.PORT || 3001;

app.use(auth(config));

// Sets Handlebars as the default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database routes below
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", routes); // Database routes
app.use(authRoutes); // uses: /login /logout /profile
app.use(htmlRoutes); // uses: /createcards etc....

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App hosted on: http://localhost:${PORT}/`)
  );
});
