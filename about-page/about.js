import { checkAuth, logout, getMyProfile, getUser } from '../fetch-utils.js';
import { renderHeader } from '../render-utils.js';

// checkAuth();

const body = document.querySelector('body');
const loadingScreen = document.querySelector('.loading-screen');

document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

window.addEventListener('load', async () => {
    loadingScreen.classList.toggle('invisible');
    if (getUser()) {
        await fetchandDisplayHeader();
    }
    loadingScreen.classList.toggle('invisible');
});

async function fetchandDisplayHeader() {
    const profile = await getMyProfile();
    const userId = 'about';
    const hardHeader = document.querySelector('header');
    body.removeChild(hardHeader);
    const header = renderHeader(profile, userId);
    body.prepend(header);
}