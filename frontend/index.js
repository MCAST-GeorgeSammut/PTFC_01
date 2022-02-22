document.addEventListener("submit", (e) => {
  e.preventDefault();
  submitLoginInformation();
});


async function submitLoginInformation(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const url = "http://localhost:3001/login?email=" + email + "&password=" + password;

    const headers = {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": true,
    };

    const response = await axios.post(url, {}, { headers });
    console.log(response);
}

// function submitLoginInformation(){
//     const form = document.querySelector("form");
//     let data = new FormData(form);
// }