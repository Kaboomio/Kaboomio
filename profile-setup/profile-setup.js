import { 
    checkAuth, 
    getAllUsernames, 
    logout,
    updateProfile,
} from '../fetch-utils.js';

const form = document.querySelector('form');
const logoutButton = document.getElementById('logout');

let usernames = [];

checkAuth();
window.addEventListener('load', async () => {
    usernames = await getAllUsernames();
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const setUsername = data.get('username');
    const setAvatar = document.querySelector(`input[name='avatar']:checked`).id;
    const setBio = data.get('bio');
    const usernameCheck = setUsername.toLowerCase();
    const passCheck = await checkUsername(usernameCheck);
    if (passCheck) {
        await updateProfile(setUsername, setAvatar, setBio);
        location.replace('../home-page');
        form.reset();
    }
});

logoutButton.addEventListener('click', () => {
    logout();
});

async function checkUsername(check) {
    let test = true;
    for (let username of usernames) {
        if (username === check) {
            alert('Username is taken. Try again.');
            test = false;
        }
    }
    return test;
}