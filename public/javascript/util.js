// This script connects to the login page and
// allows the user to login (auth0), logout
// and go to the createcards page.
$(document).ready(function () {
  $(".lets-study-btn").click(function () {
    location.assign("/createcards");
  });

  $(".login-btn").click(function () {
    location.assign("/login");
  });

  $(".logout-btn").click(function () {
    location.assign("/logout");
  });

  $(".home-btn").click(function () {
    location.assign("/");
  });

  $(".startStudying").click(function(){
    location.assign("/study");
  });
});



// function startStudying() {
  
//   console.log("hi");
// }
