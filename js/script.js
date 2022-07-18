// variable for the overview section on the index - for the profile info
const overview = document.querySelector(".overview");
// variable for the repo list section on the index page - to list all repos
const repoList = document.querySelector(".repo-list")
// variable to select all repos 
const allRepos = document.querySelector(".repos");
// variable for the repo info section on the index page - to list all info about the selected repo
const repoData = document.querySelector(".repo-data");
// select the "Back to Repo Gallery" Button
const backToRepos = document.querySelector(".view-repos");
// select the search window to search repos
const filterInput = document.querySelector(".filter-repos");

const username = "werdnamac";


//fetch user info from github
const getUserInfo = async function() {
    const userRequest = await fetch(`https://api.github.com/users/${username}`);
    const userInfo = await userRequest.json();
    displayInfo(userInfo);
}

getUserInfo();

// get user info for display
const displayInfo = function(userInfo) {
    const userDiv = document.createElement("div");
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
    getRepoInfo();
    
}

// fetch names and info about all repos
const getRepoInfo = async function() {
  const repoInfoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoInfo = await repoInfoRequest.json();
  displayRepoInfo(repoInfo);
  
}

// display a search bar and all the repos
const displayRepoInfo = function (repoInfo) {
  // first show the search bar
  filterInput.classList.remove("hide");
  //loop through all repo info and append to a list of repos
  for (const repo of repoInfo) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`
    repoList.append(repoItem);
  }
}


//if a repo is selected
repoList.addEventListener("click", function(e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoDetails(repoName);
  }
});

// fetch info about a specific repo
const getRepoDetails = async function(repoName) {
  const repoDetailsRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoDetails = await repoDetailsRequest.json();

  //fetch info about languages and put all languages in an array
  const fetchLanguages = await fetch(repoDetails.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);
  const languageArray = [];
  for (const key in languageData) {
    languageArray.push(key);
  }
  displayRepoDetails(repoDetails, languageArray);
}

// display repo details
const displayRepoDetails = function (repoDetails, languageArray) {
  //get the repo-data class ready to be shown
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  allRepos.classList.add("hide");

  // create a div with all repo info and add it to the repo Data section
  const repoDataDiv = document.createElement("div");
  repoDataDiv.innerHTML =

  `
  <h3>Name: ${repoDetails.name}</h3>
  <p>Description: ${repoDetails.description}</p>
  <p>Default Branch: ${repoDetails.default_branch}</p>
  <p>Languages: ${languageArray.join(", ")}</p>
  <a class="visit" href="${repoDetails.html_url}" target="_blank" 
  rel="noreferrer noopener">View Repo on GitHub!</a>
  
  `;
  repoData.append(repoDataDiv);
  backToRepos.classList.remove("hide");
};

// button to return to the list of repos
  backToRepos.addEventListener ("click", function () {
  // hide the specific repo data 
    repoData.classList.add("hide");
  // unhide the list of repos
    allRepos.classList.remove("hide");
  // hide this button
    backToRepos.classList.add("hide");

});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  // turn the captured text to lower case
  const lowerSearchText = searchText.toLowerCase();

  //select all repos in document
  const repos = document.querySelectorAll(".repo");

  for (const repo of repos) {
    // looping through all the repos, capturing lower case versions of all inner text
    const lowerRepo = repo.innerText.toLowerCase();
    // only show repos that include some of the searched text
    if (lowerRepo.includes(lowerSearchText)) {
     repo.classList.remove("hide");
    }
      else {
        repo.classList.add("hide");
      } // if else clause ends here
    } //for look ends here

  }); 