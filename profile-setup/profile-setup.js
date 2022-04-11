import { 
    checkAuth, 
    logout,
    updateUsernameAndAvatar
} from '../fetch-utils.js';

const form = document.querySelector('form');
const logoutButton = document.getElementById('logout');

checkAuth();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const username = data.get('username');
    const avatar = document.querySelector(`input[name='avatar']:checked`).id;
    await updateUsernameAndAvatar(username, avatar);
    // location.replace('../mario');
    form.reset();
});

logoutButton.addEventListener('click', () => {
    logout();
});