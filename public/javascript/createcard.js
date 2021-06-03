const flashcards = document.getElementsByClassName("flashcards")[0];
const createCard = document.getElementsByClassName("create-card")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");
//const userEmail =
let contentArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

contentArray.forEach(divMaker);

function divMaker(text) {
  var div = document.createElement("div");
  var h2_question = document.createElement("h2");
  var h2_answer = document.createElement("h2");

  div.className = "flashcard";

  h2_question.setAttribute(
    "style",
    "border-top:1px solid red; padding: 15px; margin-top:30px"
  );
  h2_question.innerHTML = text.my_question;

  h2_answer.setAttribute("style", "text-align:center; display:none; color:red");
  h2_answer.innerHTML = text.my_answer;

  div.appendChild(h2_question);
  div.appendChild(h2_answer);

  div.addEventListener("click", function () {
    if (h2_answer.style.display == "none") h2_answer.style.display = "block";
    else h2_answer.style.display = "none";
  });

  flashcards.appendChild(div);
}

function addFlashcard() {
  var flashcard_info = {
    my_question: question.value,
    my_answer: answer.value,
  };
  // Get the id of the current user
  //   fetch("/profile")
  //     .then((res) => res.json())
  //     .then((data) => {});

  // We first get the profile email
  fetch("/profile")
    .then(function (resProfile) {
      return resProfile.json();
    })
    .then(function (profileData) {
      console.log("PROFILE DATA");
      console.log(profileData);
      // Then using the profile email we search the data base to get the userId
      fetch(`api/users/getid/${profileData.email}`)
        .then(function (fullUserData) {
          return fullUserData.json();
        })
        .then(function (Data) {
          console.log(`POSTING DATA`);
          console.log(Data[0].id);
          postData("/api/flashcards", {
            question: flashcard_info.my_question,
            answer: flashcard_info.my_answer,
            userId: Data[0].id,
          });
        });
    })
    .catch(function (error) {
      console.log(error);
    });

  contentArray.push(flashcard_info);
  localStorage.setItem("items", JSON.stringify(contentArray));
  divMaker(contentArray[contentArray.length - 1]);
  question.value = "";
  answer.value = "";
}

async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

function delFlashcards() {
  localStorage.clear();
  flashcards.innerHTML = "";
  contentArray = [];
}

function showCreateCardBox() {
  createCard.style.display = "block";
}

function hideCreateCardBox() {
  createCard.style.display = "none";
}
