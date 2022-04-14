import { logout, getMyProfile, getUser } from '../fetch-utils.js';
import { renderAboutHeader } from '../render-utils.js';

const body = document.querySelector('body');
const loadingScreen = document.querySelector('.loading-screen');

document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

window.addEventListener('load', async () => {
    if (getUser()) {
        await fetchAndDisplayHeader();
    }
    loadingScreen.classList.add('invisible');
});

async function fetchAndDisplayHeader() {
    const profile = await getMyProfile();
    const hardHeader = document.querySelector('header');
    body.removeChild(hardHeader);
    const header = renderAboutHeader(profile);
    body.prepend(header);
}