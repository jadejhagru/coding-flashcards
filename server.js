const { auth, requiresAuth } = require("express-openid-connect");
const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     baseURL: process.env.BASE_URL,
//     secret: process.env.SECRET,
//   })
// );

// // // auth router attaches /login, /logout, and /callback routes to the baseURL
// // app.use(auth(config));

// app.get("/", (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// });

// app.get("/profile", requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

const port = process.env.port || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
