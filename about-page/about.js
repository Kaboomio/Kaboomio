import { checkAuth, logout, getMyProfile, getUser } from '../fetch-utils.js';
import { renderHeader } from '../render-utils.js';

// checkAuth();

const body = document.querySelector('body');

window.addEventListener('load', async () => {
    if (getUser()) {
        await fetchandDisplayHeader();
    }
});

document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

async function fetchandDisplayHeader() {
    const profile = await getMyProfile();
    const userId = 'about';
    const header = renderHeader(profile, userId);
    body.firstElementChild.remove();
    body.prepend(header);
}