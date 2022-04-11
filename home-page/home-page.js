import { checkAuth, logout, client } from '../fetch-utils.js';


const logoutButton = document.getElementById('logout');
const playGameButton = document.getElementById('play-game-button');
const leaderboardDisplay = document.getElementById('display-leaderboard');

checkAuth();

window.addEventListener('load', async () => {
    // await fetchAndDisplayLeaderboard();
});

playGameButton.addEventListener('click', () => {
    window.location.replace('./mario');
});

logoutButton.addEventListener('click', () => {
    logout();
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