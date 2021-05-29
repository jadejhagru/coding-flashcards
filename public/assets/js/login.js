  const nameElement = document.getElementById("name");
  const password = document.getElementById("password");
  const form = document.getElementById("form");
  

  // When the form is submitted, we validate there's an email and password entered
  form.onsubmit = (e) => {
    e.preventDefault();
    console.log(password.value);
    console.log(nameElement.value);

    const response = await fetch("/API/Login", {
      method: "POST", 
      body: JSON.stringify({
        username: nameElement.value, 
        password: password.value,   
      }),
      headers:{
        "Content-Type":"application/json"
      }
    });

    if (response.ok){
      console.log("Success")
    }

    else{
      console.log("Error")
    }
    // let messages = [];

    // if (password.length > 6) {
    //   messages.push("Password must be between 6-20 characters")
    // }

    // if (password.length < 20) {
    //   messages.push("Password must be between 6-20 characters")
    // }
    }
  
  //   let userData = {
  //     email: emailInput.val().trim().toLowerCase(),
  //     password: passwordInput.val().trim()
  //   };

  //   if (!userData.email || !userData.password) {
  //     return;
  //   }

  //   // If we have an email and password we run the loginUser function and clear the form
  //   loginUser(userData.email, userData.password);
  //   emailInput.val("");
  //   passwordInput.val("");
  // });

  // // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  // function loginUser(email, password) {
  //   $.post("/api/login", {
  //     email: email,
  //     password: password
  //   }).then(function(data) {
  //     window.location.replace(data);
  //     console.log(data);
  //     // If there's an error, log the error
  //   }).catch(function(err) {
  //     if (err){
  //       somethingWentWrong();
  //     }
  //     console.log(err);
  //   });
  // }