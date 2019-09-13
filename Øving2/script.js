const button = document.getElementById("moodButton");

button.addEventListener("click", getMood);

function getMood() {
  let textInput = document.getElementById("textInput");
  let text = textInput.value;
  let url =
    "http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment/log?api-key=Happy!!!";
  let moodNr;

  fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        sentence: text
      })
    })
    .then(response => response.json())
    .then(json => {
      moodNr = JSON.stringify(json.value);
      console.log(moodNr);
      changeBodyColor(moodNr);
    })
    .catch(error => console.error("Error: ", error));
}

function changeBodyColor(nr) {
  let body = document.querySelector("body");

  switch (nr) {
    case "0":
      body.style.backgroundColor = "red";
      break;
    case "1":
      body.style.backgroundColor = "orange";
      break;
    case "2":
      body.style.backgroundColor = "yellow";
      break;

    case "3":
      body.style.backgroundColor = "green";
      break;

    case "4":
      body.style.backgroundColor = "lightblue";
      break;

    default:
      break;
  }
}