import { checkAuth, logout, getMyProfile, getProfile, getProfileScores, getUser } from '../fetch-utils.js';
import { renderHeader } from '../render-utils.js';

const body = document.querySelector('body');
const avatarEl = document.getElementById('avatar');
const usernameEl = document.getElementById('username');
const joinedDateEl = document.getElementById('joinedDate');
const bioEl = document.getElementById('bio');
const editButtonEl = document.getElementById('editButton');
const previousScoresContainer = document.getElementById('previousScoresContainer');
const editProfileForm = document.getElementById('editProfile');
const formContainer = document.querySelector('.profileEditForm');

const params = new URLSearchParams(window.location.search);
const profileId = params.get('id');


checkAuth();

document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

window.addEventListener('load', () => {
    setUserInfo();
    displayScoreTable();
    fetchandDisplayHeader();
});

async function setUserInfo() {
    const profile = await getProfile(profileId);

    const joinedDate = new Date(profile.created_at);

    avatarEl.src = profile.img_url;
    usernameEl.textContent = `It's a me, ${profile.username}`;
    joinedDateEl.textContent = 'Joined Date: ' + joinedDate.toLocaleDateString('en-US');
    bioEl.textContent = profile.bio;

    const userProfileId = await getMyProfile();

    if (userProfileId.id.toString() === profileId) {
        editButtonEl.classList.remove('hidden');
    }

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
        time.textContent = score.time;

        scoreRow.append(initials, scoreEl, level, date, time);

        previousScoresContainer.append(scoreRow);
    }
}


editButtonEl.addEventListener('click', () => {
    formContainer.classList.toggle('hidden');
    bioEl.classList.toggle('hidden');
});

async function fetchandDisplayHeader() {
    const profile = await getProfile(profileId);
    const user = getUser();
    const header = renderHeader(profile, user.id);
    body.firstElementChild.remove();
    body.prepend(header);
}