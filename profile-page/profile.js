import { checkAuth, logout, client, getUser } from '../fetch-utils.js';


const avatarEl = document.getElementById('avatar');
const usernameEl = document.getElementById('username');
const joinedDateEl = document.getElementById('joinedDate');
const bioEl = document.getElementById('bio');
const editButtonEl = document.getElementById('editButton');
const previousScoresContainer = document.getElementById('previousScoresContainer');
const editProfileForm = document.getElementById('editProfile');
const formContainer = document.querySelector('.formContainer');

const params = new URLSearchParams(window.location.search);
const profileId = params.get('id');


checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', () => {
    setUserInfo();
});

async function setUserInfo() {
    const profile = await getProfile(profileId);

    const joinedDate = new Date(profile.created_at);

    avatarEl.src = profile.img_url;
    usernameEl.textContent = profile.username;
    joinedDateEl.textContent = 'Joined Date: ' + joinedDate.toLocaleDateString('en-US');
    bioEl.textContent = profile.bio;

    const userProfileId = await getMyProfile();

    if (userProfileId.id.toString() === profileId) {
        editButtonEl.classList.remove('hidden');
    }

}

editButtonEl.addEventListener('click', () => {
    formContainer.classList.toggle('hidden');
    bioEl.classList.toggle('hidden');
});


async function getProfile(id) {
    const response = await client
        .from('profiles')
        .select('*')
        .match({ id: id })
        .single();

    return response.body;
}

async function getProfileScores(id) {
    const response = await client
        .from('scores')
        .select('*')
        .match({ profile_id: id });

    return response.body;
}

async function getMyProfile() {
    const user = await getUser();

    const response = await client
        .from('profiles')
        .select('*')
        .match({ user_id: user.id })
        .single();
    
    return response.body;

}