// variable for the overview section of the index - for the profile info
const overview = document.querySelector(".overview");
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