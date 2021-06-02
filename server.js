// both the sql and handlebars need express
const express = require("express");

// give ability to fetch on node server
const fetch = require("node-fetch");

// Handlebars
const exphbs = require("express-handlebars");

// Database/sql stuff
const routes = require("./src/routes");
const sequelize = require("./src/config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets Handlebars as the default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database routes
app.use("/api", routes);

// Handlebars frontend serve homepage
app.get("/", (req, res) => {
  // Fetch data from BACKEND API
  // res.render to pass it to the front end handlebars stuff
  fetch("http://localhost:3001/api/flashcards")
    .then((response) => response.json())
    .then((data) => {
      console.log("API Fetch Success:", data[0]);
      res.render("index", data[0]);
    });
});

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App hosted on: http://localhost:${PORT}/`)
  );
});
