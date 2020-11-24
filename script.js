const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getUser("Sebastian-Perz");

async function getUser(username) {
  const response = await fetch(APIURL + username);
  const responseData = await response.json();

  createUserCard(responseData);

  getRepos(username);
}

async function getRepos(username) {
  const response = await fetch(APIURL + username + "/repos");
  const responseData = await response.json();

  addReposToCard(responseData);
}

function createUserCard(user) {
  const card = document.createElement("div");

  card.classList.add("card");

  const cardHTML = `
  <div class="card">
<div class="img-container">
<img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
</div>

<div class="user-info">
<h2>${user.name}</h2>
<p>${user.bio}</p>
<ul class="info">
<li>${user.followers}<strong>FOLLOWERS</strong></li>
<li>${user.following}<strong>FOLLOWING</strong></li>
<li>${user.public_repos}<strong>REPOS</strong></li>
</ul>
<div id="repos">
</div>
</div>
</div>
`;

  fetch;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposElement = document.getElementById("repos");

  repos.forEach((repo) => {
    const repoElement = document.createElement("span");
    repoElement.classList.add("repo");

    repoElement.href = repo.html_url;
    repoElement.target = "_blank";
    repoElement.innerText = repo.name;

    reposElement.appendChild(repoElement);
  });
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);
    search.value = "";
  }
});
