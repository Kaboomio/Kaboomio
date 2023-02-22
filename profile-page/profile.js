import {
    checkAuth,
    logout,
    getMyProfile,
    getProfile,
    getProfileScores,
    getUser,
    updateProfile,
    deleteScore,
} from '../fetch-utils.js';
import { renderProfileHeader } from '../render-utils.js';

const title = document.querySelector('title');
const body = document.querySelector('body');
const loadingScreen = document.querySelector('.loading-screen');
const avatarEl = document.getElementById('avatar');
const usernameEl = document.getElementById('username');
const joinedDateEl = document.getElementById('joinedDate');
const bioEl = document.getElementById('bio');
const editIconEl = document.getElementById('editIcon');
const previousScoresContainer = document.getElementById('previousScoresContainer');
const editProfileForm = document.getElementById('editProfile');
const formContainer = document.querySelector('.profileEditForm');
const editUsernameEl = document.querySelector('#editUsername');
const editBioEl = document.querySelector('#editBio');
const tooltipEl = document.querySelector('.tooltip');

const params = new URLSearchParams(window.location.search);
const profileId = params.get('id');

checkAuth();

// EVENT LISTENERS
window.addEventListener('load', async () => {
    const profile = await getMyProfile();
    if (!profile.username) {
        location.replace('../profile-setup');
    }
    await setUserInfo();
    await displayScoreTable();
    await fetchAndDisplayHeader(profile);
    loadingScreen.classList.add('invisible');
});

editIconEl.addEventListener('click', toggleEditing);

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

// FUNCTIONS
function toggleEditing() {
    formContainer.classList.toggle('hidden');
    // bioEl.classList.toggle('hidden');
}

async function setUserInfo() {
    const profile = await getProfile(profileId);

    const joinedDate = new Date(profile.created_at);

    avatarEl.src = profile.img_url;
    usernameEl.textContent = `It's a me, ${profile.username}`;
    joinedDateEl.textContent = 'Joined Date: ' + joinedDate.toLocaleDateString('en-US');
    bioEl.textContent = profile.bio;

    let imageId = '';

    if (profile.img_url.length > 70) {
        imageId = profile.img_url.slice(74);
    } else {
        imageId = profile.img_url.slice(18);
    }

    imageId = imageId.slice(0, imageId.length - 4);

    const editedAvatarDefault = document.querySelector(`#${imageId}`);

    editedAvatarDefault.setAttribute('checked', true);

    const userProfileId = await getMyProfile();

    if (userProfileId.id.toString() === profileId) {
        editIconEl.classList.remove('hidden');
        tooltipEl.classList.remove('hidden');
    }

    editUsernameEl.value = profile.username;
    editBioEl.textContent = profile.bio;

    title.textContent = profile.username + ' | Kaboomio';
}

async function displayScoreTable() {
    const scores = await getProfileScores(profileId);

    previousScoresContainer.textContent = '';

    for (let score of scores) {
        const playDate = new Date(score.created_at);
        const scoreRow = document.createElement('tr');

        const initialsEl = document.createElement('td');
        const scoreEl = document.createElement('td');
        const levelEl = document.createElement('td');
        const dateEl = document.createElement('td');
        const timeEl = document.createElement('td');

        initialsEl.textContent = score.initials;
        scoreEl.textContent = score.score;
        levelEl.textContent = score.level;
        dateEl.textContent = `${playDate.getMonth() + 1}/${playDate.getDate()}`;
        timeEl.textContent = score.time + ' sec';

        const removeScoreEl = document.createElement('span');
        removeScoreEl.classList.add('removeItem');
        removeScoreEl.textContent = '\u00D7';
        removeScoreEl.id = score.id;

        const userProfileId = await getMyProfile();

        removeScoreEl.addEventListener('click', async () => {
            await deleteScore(removeScoreEl.id);
            await displayScoreTable();
        });

        if (userProfileId.id.toString() !== profileId) {
            removeScoreEl.classList.add('hidden');
        }

        scoreRow.append(initialsEl, scoreEl, levelEl, dateEl, timeEl, removeScoreEl);

        previousScoresContainer.append(scoreRow);
    }
}

async function fetchAndDisplayHeader(profile) {
    const user = getUser();
    const hardHeader = document.querySelector('header');
    body.removeChild(hardHeader);
    const header = renderProfileHeader(profile, user.id);
    body.prepend(header);
}
