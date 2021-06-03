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

  // /createcards
  $(".new-card-btn").click(function () {
    console.log("creating new card...");
  });
  $(".delete-card-btn").click(function () {
    console.log("deleting card...");
  });
  $(".start-btn").click(function () {
    console.log("Let's start studying...");
  });
});
