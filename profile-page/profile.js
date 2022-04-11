import { checkAuth, logout, client, getUser } from '../fetch-utils.js';


const avatarEl = document.getElementById('avatar');
const usernameEl = document.getElementById('username');
const joinedDateEl = document.getElementById('joinedDate');
const gamesPlayedEl = document.getElementById('gamesPlayed');
const bioEl = document.getElementById('bio');
const editButtonEl = document.getElementById('editButtonEl');
const previousScoresContainer = document.getElementById('previousScoresContainer');

const params = new URLSearchParams(window.location.search);
const profileId = 1;


checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', setUserInfo);

function setUserInfo() {
    const profile = getProfile(profileId);


}


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
    const user = getUser();

    const response = await client
        .from('profiles')
        .select('*')
        .match({ email: user.email })
        .single();
    
    return response.body;

}