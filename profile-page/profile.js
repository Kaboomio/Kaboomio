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
    loadingScreen.classList.toggle('invisible');

    const data = new FormData(editProfileForm);

    const editedUsername = data.get('username');
    const editedBio = data.get('bio');
    const editedAvatar = document.querySelector(`input[name='avatar']:checked`).id;

    await updateProfile(editedUsername, editedAvatar, editedBio);

    editProfileForm.reset();

    setUserInfo();

    toggleEditing();
    loadingScreen.classList.toggle('invisible');
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

    for (let score of scores) {
        const scoreRow = document.createElement('tr');
        const initials = document.createElement('td');
        const scoreEl = document.createElement('td');
        const level = document.createElement('td');
        const date = document.createElement('td');
        const time = document.createElement('td');

        const playDate = new Date(score.created_at);

        initials.textContent = score.initials;
        scoreEl.textContent = score.score;
        level.textContent = score.level;
        date.textContent = playDate.toLocaleDateString('en-US');
        time.textContent = (100 - score.time) + ' sec';

        scoreRow.append(initials, scoreEl, level, date, time);

        previousScoresContainer.append(scoreRow);
    }
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