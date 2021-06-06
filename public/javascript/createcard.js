const flashcards = document.getElementsByClassName("flashcards")[0];
const createCard = document.getElementsByClassName("create-card")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");

populateCardsAtStart();
function divMaker(text) {
  var div = document.createElement("div");
  var h2_question = document.createElement("h2");
  var h2_answer = document.createElement("h2");
  var flashcard_id = document.createElement("p");
  div.className = "flashcard";

  var editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "button";

  var delButton = document.createElement("button");
  delButton.textContent = "Delete";
  delButton.className = "button";

  editButton.setAttribute("style", "margin: 60px");

  h2_question.setAttribute(
    "style",
    "border-top:1px solid red; padding: 15px; margin-top:30px"
  );
  h2_question.innerHTML = text.my_question;
  h2_answer.setAttribute("style", "text-align:center; display:none; color:red");
  h2_answer.innerHTML = text.my_answer;
  flashcard_id.innerText = text.my_flashcardid;
  div.appendChild(h2_question);
  div.appendChild(h2_answer);
  div.appendChild(flashcard_id);
  div.appendChild(editButton);
  div.appendChild(delButton);
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

  // We first get the profile email
  fetch("/profile")
    .then(function (resProfile) {
      return resProfile.json();
    })
    .then(function (profileData) {
      // Then using the profile email we search the data base to get the userId
      fetch(`api/users/getid/${profileData.email}`)
        .then(function (fullUserData) {
          return fullUserData.json();
        })
        .then(function (Data) {
          console.log(`--User ${Data[0].id} is POSTing data...`);
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
}
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then(response => response.json())
    .then(data => {
      console.log("Posted Data id:", data.id);
      delFlashcards();
      populateCardsAtStart();
    });
  //return response.json(); // parses JSON response into native JavaScript objects
}
async function putData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
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
async function deleteData(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    //mode: "cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
function delFlashcards() {
  flashcards.innerHTML = "";
}
function showCreateCardBox() {
  createCard.style.display = "block";
}
function hideCreateCardBox() {
  createCard.style.display = "none";
}
// This function will load cards based on the logged in user and display them on the screen.
function populateCardsAtStart() {
  // Get all flashcards from the data base
  fetch("/profile") // Finds who is logged in currently
    .then(function (resProfile) {
      return resProfile.json();
    })
    .then(function (profileData) {
      // Then using the profile email we search the data base to get the userId
      fetch(`api/users/getid/${profileData.email}`)
        .then(function (fullUserData) {
          return fullUserData.json();
        })
        .then(function (Data) {
          console.log(`--User ${Data[0].id} is GETing data...`);
          fetch(`/api/users/${Data[0].id}`)
            .then(function (resUserdata) {
              return resUserdata.json();
            })
            .then(function (userData) {
              // Now we have access to the user and their flashcards
              //console.log("USER DATA GET");
              // You now have access to all flashcards that a user owns
              for (let i = 0; i < userData[0].flashcards.length; i++) {
                const cardData = {
                  my_question: userData[0].flashcards[i].question,
                  my_answer: userData[0].flashcards[i].answer,
                  my_flashcardid: userData[0].flashcards[i].id,
                };
                divMaker(cardData);
              }
            });
        });
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Update an existing flashcard on the database
function UpdateFlashcard(flashcardId, newQuestion, newAnswer) {
  putData(`/api/flashcards/${flashcardId}`, {
    question: newQuestion,
    answer: newAnswer,
  });
}
function DeleteFlashcard(flashcardId) {
  deleteData(`/api/flashcards/${flashcardId}`);
}
