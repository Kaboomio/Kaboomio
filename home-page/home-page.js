import { checkAuth, logout, client, getMyProfile } from '../fetch-utils.js';
import { renderHomeHeader } from '../render-utils.js';

const body = document.querySelector('body');
const playGameButton = document.getElementById('play-game-button');
const leaderboardDisplay = document.getElementById('display-leaderboard');
const yoshiEgg = document.getElementById('yoshi-egg');
const loadingScreen = document.querySelector('.loading-screen');

checkAuth();

// EVENT LISTENERS
window.addEventListener('load', async () => {
    const profile = await getMyProfile();
    if (!profile.username) {
        location.replace('../profile-setup');
    }
    await fetchAndDisplayLeaderboard();
    await fetchAndDisplayHeader(profile);
    loadingScreen.classList.add('invisible');
});

document.addEventListener('click', (e) => {
    // LOGOUT BUTTON FUNCTIONALITY
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

playGameButton.addEventListener('click', () => {
    window.location.replace('../mario');
});

yoshiEgg.addEventListener('click', () =>{
    const yoshiSound = new Audio('../assets/sounds/yoshi_1.mp3'); 
    function playYoshi(){
        yoshiSound.play();
    }
    playYoshi();
});

// FUNCTIONS
async function fetchAndDisplayLeaderboard(){
    leaderboardDisplay.textContent = '';
    
    const leaderboard = await getScoreboard();
    const leaderDiv = document.createElement('div');
    const leaderboardTag = document.createElement('p');
    const leaderboardList = document.createElement('ol');

    leaderboardTag.textContent = `Initials.......Score........Time`;

    for (let leaders of leaderboard){
        const leaderboard = document.createElement('a');
        leaderboard.classList.add('mini');
        leaderboard.textContent = `${leaders.initials}.............${leaders.score}.........${leaders.time}`;
        console.log(leaders.profile_id);
        leaderboard.addEventListener('click', async () => {
            leaderboard.href = `../profile-page/?id=${leaders.profile_id}`;
        });

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
        .order('score', { ascending: false })
        .range(0, 4);

    return response.body;
}

async function fetchAndDisplayHeader(profile) {
    const hardHeader = document.querySelector('header');
    body.removeChild(hardHeader);
    const header = renderHomeHeader(profile);
    body.prepend(header);
}