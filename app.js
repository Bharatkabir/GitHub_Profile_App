const apiURL = 'https://api.github.com/users/';
const img = document.querySelector('img');
const userName = document.querySelector('#userName');
const bio = document.querySelector('#bio');
const repo = document.querySelector('.repo');
const follow = document.querySelector('#follow');
const following = document.querySelector('#following');
const loc = document.querySelector('#loc');
const repoList = document.querySelector('.repo-list');
const searchBox = document.querySelector('.input')

const getUsers = async (username) => {
    try {
        const response = await fetch(apiURL + username);
        const data = await response.json();
        img.src = data.avatar_url;
        userName.innerHTML = data.name
        bio.innerText = data.bio
        repo.innerText = `Repositories: ${data.public_repos}`
        console.log(repo);
        follow.innerText=`${data.followers} followers`
        following.innerHTML = `${data.following} following`
        loc.innerText = `Location : ${data.location}`
        getRepos(username)
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

const getRepos = async (username) =>{
    const repoResponse = await fetch(apiURL+username+'/repos') 
    const data = await  repoResponse.json();
    data.forEach((item)=>{
        const elem = document.createElement('a')
        elem.href = item.html_url
        elem.innerText = item.name
        elem.target = '_blank'
        repoList.appendChild(elem)
    })
}
searchBox.addEventListener('focusout', async () => {
    await formSubmit();
});

async function formSubmit() {
    const username = searchBox.value;

    if (username !== '') {
        const response = await fetch(apiURL + username);

        if (response.status === 200) {
            const data = await response.json();
            getUsers(username);
            searchBox.value = '';
        } else {
            alert('User not found');
            searchBox.value = ''
        }
    }
}



