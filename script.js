const APIURL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

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

  const anonymLink =
    "https://sitiocero.net/wp-content/uploads/2017/05/00-anonymous-150x150.jpg";

  const cardHTML = `
  <div class="card">
<div>
<img class="avatar" src="${
    user.avatar_url ? user.avatar_url : anonymLink
  }" alt="${user.name}" />
</div>

<div class="user-info">
<h2>${user.name ? user.name : "There's no such user"}</h2>
<p>${user.bio ? user.bio : "There's no bio"}</p>
<ul class="info">
<li>${user.followers ? user.followers : ""}<strong>FOLLOWERS</strong></li>
<li>${user.following ? user.following : ""}<strong>FOLLOWING</strong></li>
<li>${user.public_repos ? user.public_repos : ""}<strong>REPOS</strong></li>
</ul>
<div id="repos">
</div>
</div>
</div>
`;

  main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
  const reposElement = document.getElementById("repos");

  repos.forEach((repo) => {
    const repoElement = document.createElement("a");
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
