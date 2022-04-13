import { checkAuth, logout, getMyProfile, getProfile, getProfileScores, getUser, updateProfile } from '../fetch-utils.js';
import { renderHeader } from '../render-utils.js';

const title = document.querySelector('title');
const body = document.querySelector('body');
const loadingScreen = document.querySelector('.loading-screen');
const avatarEl = document.getElementById('avatar');
const usernameEl = document.getElementById('username');
const joinedDateEl = document.getElementById('joinedDate');
const bioEl = document.getElementById('bio');
const editButtonEl = document.getElementById('editButton');
const previousScoresContainer = document.getElementById('previousScoresContainer');
const editProfileForm = document.getElementById('editProfile');
const formContainer = document.querySelector('.profileEditForm');
const editUsernameEl = document.querySelector('#editUsername');
const editBioEl = document.querySelector('#editBio');

const params = new URLSearchParams(window.location.search);
const profileId = params.get('id');

checkAuth();

document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

window.addEventListener('load', async () => {
    loadingScreen.classList.toggle('invisible');
    await setUserInfo();
    await displayScoreTable();
    await fetchandDisplayHeader();
    loadingScreen.classList.toggle('invisible');
});

editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(editProfileForm);

    const editedUsername = data.get('username');
    const editedBio = data.get('bio');
    const editedAvatar = document.querySelector(`input[name='avatar']:checked`).id;

    await updateProfile(editedUsername, editedAvatar, editedBio);

    editProfileForm.reset();

    setUserInfo();

    toggleEditing();
});

function toggleEditing() {
    formContainer.classList.toggle('hidden');
    bioEl.classList.toggle('hidden');
}

async function setUserInfo() {
    const profile = await getProfile(profileId);

    const joinedDate = new Date(profile.created_at);

    avatarEl.src = profile.img_url;
    usernameEl.textContent = `It's a me, ${profile.username}`;
    joinedDateEl.textContent = 'Joined Date: ' + joinedDate.toLocaleDateString('en-US');
    bioEl.textContent = profile.bio;

    let imageId = profile.img_url.slice(18);

    imageId = imageId.slice(0, imageId.length - 4);

    const editedAvatarDefault = document.querySelector(`#${imageId}`);

    editedAvatarDefault.setAttribute('checked', true);

    const userProfileId = await getMyProfile();

    if (userProfileId.id.toString() === profileId) {
        editButtonEl.classList.remove('hidden');
    }

    editUsernameEl.value = profile.username;
    editBioEl.textContent = profile.bio;

    title.textContent = profile.username + ' | Kaboomio';
}

async function displayScoreTable() {
    const scores = await getProfileScores(profileId);

    previousScoresContainer.textContent = '';

    const scoreboardHeader = document.createElement('p');
    const scoresList = document.createElement('ol');

    scoreboardHeader.textContent = `Initials.......Score........Level........Date........Elapsed Time`;

    for (let score of scores) {
        const playDate = new Date(score.created_at);
        const scoreRow = document.createElement('li');
        scoreRow.classList.add('mini');
        scoreRow.textContent = `${score.initials}.............${score.score}.............${score.level}.............${playDate.toLocaleDateString('en-US')}.............${(100 - score.time)} sec`;

        const removeScoreEl = document.createElement('span');
        removeScoreEl.classList.add('removeItem');
        removeScoreEl.textContent = '\u00D7';
        removeScoreEl.id = score.id;

        if (userProfileId.id.toString() === profileId) {
            editButtonEl.classList.remove('hidden');
        }

        scoresList.append(scoreRow);
    }

    previousScoresContainer.append(scoreboardHeader, scoresList);
}


editButtonEl.addEventListener('click', toggleEditing);

async function fetchandDisplayHeader() {
    const profile = await getProfile(profileId);
    const user = getUser();
    const hardHeader = document.querySelector('header');
    body.removeChild(hardHeader);
    const header = renderHeader(profile, user.id);
    body.prepend(header);
}