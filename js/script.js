// variable for the overview section on the index - for the profile info
const overview = document.querySelector(".overview");
// variable for the repo list section on the index page - to list all repos
const repoList = document.querySelector(".repo-list")
const username = "werdnamac";

//fetch user info from github
const getUserInfo = async function() {
    const userRequest = await fetch(`https://api.github.com/users/${username}`);
    let userInfo = await userRequest.json();
    displayInfo(userInfo);
}

getUserInfo();

// get user info for display
const displayInfo = function(userInfo) {
    let userDiv = document.createElement("div");
    userDiv.classList.add("user-info");

    userDiv.innerHTML =

    `
    <figure>
      <img alt="user avatar" src=${userInfo.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${userInfo.name}</p>
      <p><strong>Bio:</strong> ${userInfo.bio}</p>
      <p><strong>Location:</strong> ${userInfo.location}</p>
      <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
    </div> 
    `
    overview.append(userDiv);
    
}

// fetch names and info about all repos
const getRepoInfo = async function() {
  const repoInfoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated?per_page=100`);
  let repoInfo = await repoInfoRequest.json();
  displayRepoInfo(repoInfo);
  
}

// loop through all repo info and append to a list of repos
const displayRepoInfo = function (repoInfo) {
  for (const repo of repoInfo) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoItem);
  }
}

getRepoInfo();

