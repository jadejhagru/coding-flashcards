// function cardDeck () {
//     let deckId;
//     let deck = [];
//     let count = 0;
//     // assigns the url from the lead in page 
//     let url = window.location.search;
    
    
// const getCards =  => require("./api/Flashcards");

// app.get('./api/Flashcards', (req, res) =>{
//     res.json(Flashcards)
// })

// + flashcard_id, response => {
//     deck = response;
//     console.log("response", deck)
//     displayCard(deck);
// });



const flashcards = document.getElementsByClassName("flashcards")[0];
const createCard = document.getElementsByClassName("create-card")[0];
const question = document.getElementById("question");
const answer = document.getElementById("answer");


function divMaker(text) {
  // Create parent element
  var div = document.createElement("div");

  // Create child elements
  var titleQ = document.createElement("h2");
  var h2_question = document.createElement("textarea");
  var titleA = document.createElement("h2");
  var h2_answer = document.createElement("textarea");
  var flashcard_id = document.createElement("p");
  var editButton = document.createElement("button");
  var delButton = document.createElement("button");

  // set classnames
  div.className = "flashcard";
  h2_question.className = "question";
  h2_answer.className = "answer";

  // question attribute styles
  h2_question.setAttribute("style", "padding: 15px");
  //h2_question.setAttribute("contenteditable", true);

  // answer attribute styles
  h2_answer.setAttribute("style", "padding: 15px");
  //h2_answer.setAttribute("contenteditable", true);

  // Hide back-end flashcard id from being read.
  flashcard_id.setAttribute("style", "display: none");

  titleQ.setAttribute(
    "style",
    "border-top:2px solid black; padding: 15px; margin-top:30px"
  );

  // disable text area
  h2_question.disabled = true;
  h2_answer.disabled = true;

  // Set title text
  titleQ.innerText = "Question:";
  titleA.innerText = "Answer:";

  // Set flashcard content to passed through text object
  h2_question.innerHTML = text.my_question;
  h2_answer.innerHTML = text.my_answer;
  flashcard_id.innerText = text.my_flashcardid;

  // Append elements to flashcard div container
  div.appendChild(titleQ);
  div.appendChild(h2_question);
  div.appendChild(titleA);
  div.appendChild(h2_answer);
  div.appendChild(flashcard_id);
  div.appendChild(editButton);
  div.appendChild(delButton);

  // append flashcard div to flashcards list
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
    .then((response) => response.json())
    .then((data) => {
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

function startStudying() {
  
  console.log("hi");
}

