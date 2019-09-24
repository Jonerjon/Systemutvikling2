let myButton = document.querySelector("#myButton");
let getPersonBtn = document.querySelector("#getPerson");

getPersonBtn.addEventListener("click", () => {
  getPerson();
});

myButton.addEventListener("click", e => {
  console.log("Fikk klikk-event");

  const userInput = document.querySelector("#userInput").value;
  const passwordInput = document.querySelector("#passwordInput").value;

  console.log(passwordInput);

  const urlLogin = "http://localhost:8080/login";

  fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        "brukernavn": userInput,
        "passord": passwordInput
      })
    })
    .then(response => response.json())
    .then(json => {
      window.localStorage.token = JSON.stringify(json.jwt);
      getPerson();
    })
    .catch(error => console.error("Error: ", error));
});

function getPerson() {
  let url = "http://localhost:8080/api/person/1";
  fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(localStorage.token)
      }
    })
    .then(response => response.json())
    .then(json => {
      refreshToken();
      console.log(JSON.stringify(json))
    })
    .catch(error => console.error("Error: ", error));

}

function refreshToken() {
  let url = "http://localhost:8080/token"
  fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-access-token": JSON.parse(localStorage.token)
      }
    })
    .then(response => response.json())
    .then(json => {
      localStorage.token = JSON.stringify(json.jwt);
      console.log(JSON.stringify(json))
    })
    .catch(error => console.error("Error: ", error));
}