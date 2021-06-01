// both the sql and handlebars need express
const express = require("express");

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

const books = [
  {
    title: "Love You Forever",
    read: false,
    author: "Robert Munsch",
  },
  {
    title: "The Giving Tree",
    read: false,
    author: "Shel Silverstein",
  },
  {
    title: "Where the Red Fern Grows",
    read: true,
    author: "Wilson Rawls",
  },
  {
    title: "The Fault in Our Stars",
    read: true,
    author: "John Green",
  },
  {
    title: "Out of My Mind",
    read: false,
    author: "Sally Engelfried",
  },
  {
    title: "Wonder",
    read: true,
    author: "Barbara Schultz",
  },
];

// Database routes
app.use("/api", routes);

// Handlebars frontend serve homepage
app.get("/", (req, res) => {
  const data = {
    library: books,
  };
  res.render("index", data);
});

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`App hosted on: http://localhost:${PORT}/`)
  );
});
