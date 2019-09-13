const pancakeMenu = document.querySelector("#pancake");
var value = 100; //need to have this value decrease somehow.

getArticles();
setInterval("rollingText(value)", 15);

pancakeMenu.addEventListener("click", () => {
  let mobileBar = document.querySelector(".mobileNavBar");
  let navMenu = document.querySelector(".navUl");
  mobileBar.classList.toggle("mobileNavBar-active");
  navMenu.classList.toggle("navUl-active");
});

function getArticles() {
  let url = "http://localhost:8080/article/1";

  fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    })
    .then(response => response.json())
    .then(json => getPosts(json))
    .catch(error => console.error("Error: ", error));
}

function getPosts(json) {
  let rollingNews = document.querySelector("#rollText");
  let rollHead = "";
  for (let i = 0; i < json.length; i++) {
    addArticles(
      json[i].headline,
      json[i].picture,
      json[i].content,
      json[i].post_date
    );
    console.log(i);
    rollHead +=
      json[i].headline + " " + json[i].post_date.substring(11, 16) + " ||  ";
  }
  rollingNews.innerHTML = rollHead;
}

function rollingText(input) {
  if (input < -60) {
    value = 100;
  }
  let rollingNews = document.querySelector("#rollText");
  rollingNews.style.transform = `translateX(${input}%)`;
  value -= 0.08;
}

function addArticles(headlineText, picture, content, post_date) {
  const contentGrid = document.querySelector(".contentGrid");
  const divArticle = document.createElement("div");
  divArticle.classList.add("article");
  contentGrid.appendChild(divArticle);
  const articleImg = document.createElement("div");
  articleImg.classList.add("articleImg");
  const img = document.createElement("img");
  img.setAttribute("src", `${picture}`);
  img.setAttribute("width", "380px");
  img.setAttribute("height", "380px");
  articleImg.appendChild(img);
  divArticle.appendChild(articleImg);
  const headline = document.createElement("div");
  headline.classList.add("headline");
  headline.innerHTML = `${headlineText}`;
  divArticle.appendChild(headline);
  const postDate = document.createElement("div");
  postDate.classList.add("postDate");
  postDate.innerHTML = `${post_date.substring(0, 16).replace("T", " // ")}`;
  divArticle.appendChild(postDate);
  const breadText = document.createElement("div");
  breadText.classList.add("breadtext");
  breadText.textContent = `${content}`;
  divArticle.appendChild(breadText);
}