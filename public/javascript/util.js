// This script connects to the login page and
// allows the user to login (auth0), logout
// and go to the createcards page.
$(document).ready(function () {
  $(".lets-study-btn").click(function () {
    location.replace("/createcards");
  });

  $(".login-btn").click(function () {
    location.replace("/login");
  });

  $(".logout-btn").click(function () {
    location.replace("/logout");
  });
});
