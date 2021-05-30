const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();

	
	if(usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
	} else {
		setSuccessFor(email);
	}
	
	if(passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
	} else {
		setSuccessFor(password);
	}
	
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
	
function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}













// const nameElement = document.getElementById("name");
  // const password = document.getElementById("password");
  // const form = document.getElementById("form");
  


  // // When the form is submitted, we validate there's an email and password entered
  // form.onsubmit = (e) => {
  //   e.preventDefault();
  //   console.log(password.value);
  //   console.log(nameElement.value);

  //   const response = await fetch("/API/Login", {
  //     method: "POST", 
  //     body: JSON.stringify({
  //       username: nameElement.value, 
  //       password: password.value,   
  //     }),
  //     headers:{
  //       "Content-Type":"application/json"
  //     }
  //   });

  //   if (response.ok){
  //     console.log("Success")
  //   }

  //   else{
  //     console.log("Error")
  //   }
  //   // let messages = [];

  //   // if (password.length > 6) {
  //   //   messages.push("Password must be between 6-20 characters")
  //   // }

  //   // if (password.length < 20) {
  //   //   messages.push("Password must be between 6-20 characters")
  //   // }
  //   }
  
  // //   let userData = {
  // //     email: emailInput.val().trim().toLowerCase(),
  // //     password: passwordInput.val().trim()
  // //   };

  // //   if (!userData.email || !userData.password) {
  // //     return;
  // //   }

  // //   // If we have an email and password we run the loginUser function and clear the form
  // //   loginUser(userData.email, userData.password);
  // //   emailInput.val("");
  // //   passwordInput.val("");
  // // });

  // // // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  // // function loginUser(email, password) {
  // //   $.post("/api/login", {
  // //     email: email,
  // //     password: password
  // //   }).then(function(data) {
  // //     window.location.replace(data);
  // //     console.log(data);
  // //     // If there's an error, log the error
  // //   }).catch(function(err) {
  // //     if (err){
  // //       somethingWentWrong();
  // //     }
  // //     console.log(err);
  // //   });
  // // }