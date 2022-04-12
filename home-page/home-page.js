import { checkAuth, logout, client, getMyProfile } from '../fetch-utils.js';
import { renderHeader } from '../render-utils.js';

const body = document.querySelector('body');
const playGameButton = document.getElementById('play-game-button');
const leaderboardDisplay = document.getElementById('display-leaderboard');

checkAuth();

window.addEventListener('load', async () => {
    // await fetchAndDisplayLeaderboard();
    fetchandDisplayHeader();
});

playGameButton.addEventListener('click', () => {
    window.location.replace('../mario');
});

document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

async function fetchAndDisplayLeaderboard(){
    leaderboardDisplay.textContent = '';
    
    const leaderboard = await getScoreboard();
    const leaderDiv = document.createElement('div');
    const leaderboardTag = document.createElement('h2');
    const leaderboardList = document.createElement('ol');

    leaderboardTag.textContent = `Initials......Score......Time`;

    for (let leaders of leaderboard){
        // const initials = document.createElement('h3');
        // const score = document.createElement('h3');
        // const time = document.createElement('h3');
        const leaderboard = document.createElement('h3');

        leaderboard.textContent = `${leaders.initials}.............${leaders.score}.........${leaders.time}`;
        // initials.textContent = leaders.initials;
        // score.textContent = leaders.score;
        // time.textContent = leaders.time;

        leaderboardList.append(leaderboard);
        leaderboardList.classList.add('leaders');
    }

    leaderDiv.append(leaderboardTag, leaderboardList);
    leaderDiv.classList.add('mini-leaderboard');
    leaderboardDisplay.append(leaderDiv);
}

async function getScoreboard(){
    const response = await client
        .from('scores')
        .select('*')
        .order('score', { ascending: false });

    return response.body;
}

async function fetchandDisplayHeader() {
    const profile = await getMyProfile();
    const header = renderHeader(profile);
    body.firstElementChild.remove();
    body.prepend(header);
}