const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

//Must contain 1 lowercase, 1 uppercase, 1 numeric, one special character
//Must be eight characters or longer
const validatePasswordStrength = (password) => {
  return String(password).match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  );
};

//Has to be in letters only
const validateNameSurname = (input) => {
  return String(input).match(
    /^(?=.*[a-z])(?=.*[A-Z])/
  );
};

async function submitLoginInformation() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const url = `http://localhost:3001/login?email=${email}&password=${password}`;

  const headers = {
    "Content-Type": "text/html",
    "Access-Control-Allow-Origin": true,
  };

  const response = await axios.post(url, {}, { headers });
  if (response.data.result === "success") {
    console.log("Hello, " + response.data.name);
  } else {
    console.log("Invalid credentials.")
  }

}

async function submitRegisterInformation() {

  const name = document.getElementById("name").value;
  const surname = document.getElementById("surname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirm_password = document.getElementById("confirm_password").value;

  const url = `http://localhost:3001/register?email=${email}&password=${password}&name=${name}&surname=${surname}`;

  //check if email is in correct format
  //check if the two passwords match
  //check if name, surname and password fields are not empty
  if (
    name !== "" &&
    surname !== "" &&
    password !== "" &&
    password === confirm_password &&
    validateEmail(email) &&
    validatePasswordStrength(password) &&
    validateNameSurname(name) &&
    validateNameSurname(surname)) {
    const headers = {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": true,
    };

    const response = await axios.post(url, {}, { headers });
    if (response.data.result === "success") {
      console.log("Hello, " + response.data.name);
    } else {
      console.log("Invalid credentials.")
    }
  } else {
    console.log("Invalid fields.");
  }

  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }


  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

}