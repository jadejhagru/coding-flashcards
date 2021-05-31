const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

form.addEventListener('submit', e => {
	e.preventDefault();
	
	checkInputs();
});

function checkInputs() {
	// trim to remove the whitespaces
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();
	
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
	
	if(password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
	} else if(passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
	} else{
		setSuccessFor(password2);
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










// $(document).ready(function() {
//   // Getting references to our form and input
//   var signUpForm = $("#signup");
//   var emailInput = $("input#email-input");
//   var passwordInput = $("input#password-input");
//   var passwordVerify = $("input#password-check");
//   $("#password-check").keyup(checkPasswordMatch);
    
//   });

//   // When the signup button is clicked, we validate the email and password are not blank
//   signUpForm.on("submit", function(event) {
//     event.preventDefault();
//     var userData = {
//       email: emailInput.val().trim(),
//       password: passwordInput.val().trim(),
//       passwordChek: passwordVerify.val().trim()
//     };
//     console.log(userData.email);
//     let userCount = "/api/user/count/";
//     userCount += userData.email;
//     console.log(userCount);
//     $.get(userCount).then ( function(result){
//     console.log("searching");
//       console.log(result);
//       if (result === 1){
//         alert("That user already exists!");
//       }else{
//         if (!userData.email || !userData.password) {
//           alert("Please complete user info.");
//           return;
//         }
//         else if (userData.password !== userData.passwordChek){
//           alert("Passwords do not match!");
//         }else{
//           // If we have an email and password, run the signUpUser function
//           signUpUser(userData.email, userData.password);
//           emailInput.val("");
//           passwordInput.val("");
//         }

//       }
//     });//end of async get
//   });//end of signup click binding
    

//   // Does a post to the signup route. If successful, we are redirected to the members page
//   // Otherwise we log any errors
//   function signUpUser(email, password) {
//     $.post("/api/signup", {
//       email: email,
//       password: password
//     })
//       .then(function(data) {
//         window.location.replace(data);
//         // eslint-disable-next-line prettier/prettier
      
//       })
//       .catch(handleLoginErr);
//   }

//   function handleLoginErr(err) {
//     $("#alert .msg").text(err.responseJSON);
//     $("#alert").fadeIn(500);
//   }; 
  
//   //end of doc ready


