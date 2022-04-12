import { checkAuth, logout, client, getMyProfile, getUser } from '../fetch-utils.js';
import { renderHeader } from '../render-utils.js';

// checkAuth();

const body = document.querySelector('body');
const scoreContainerEl = document.querySelector('.score-container');
const sortParameter = document.getElementById('sort-param');
const ascdescSelect = document.getElementById('sort-asc-desc');


document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

window.addEventListener('load', async () => {
    fetchandDisplayLeaderboard();
    if (getUser()) {
        fetchandDisplayHeader();
    }
});


sortParameter.addEventListener('change', fetchandDisplayLeaderboard);

ascdescSelect.addEventListener('change', fetchandDisplayLeaderboard);


async function getLeaderboard(type, trueFalse){
    const response = await client
        .from('scores')
        .select('*')
        .order(type, { ascending: trueFalse });




    return response.body;

}

async function fetchandDisplayLeaderboard() {

    scoreContainerEl.textContent = '';

    const ascending = ascdescSelect.value === 'asc' ? true : false;

    const scores = await getLeaderboard(sortParameter.value, ascending);


    for (let score of scores) {
        const scoreEl = document.createElement('div');
        const scoreInitials = document.createElement('h3');
        const scoreScores = document.createElement('h3');
        const scoreTime = document.createElement('p');
        const linkEl = document.createElement('a');
        scoreEl.classList.add('score');
      

        scoreInitials.textContent = score.initials;
        scoreScores.textContent = score.score;
        scoreTime.textContent = score.time;

        linkEl.href = `../profile/?id=${score.profile_id}`;

        scoreEl.append(scoreInitials, scoreScores, scoreTime);
        scoreContainerEl.append(scoreEl);

    }
}

async function fetchandDisplayHeader() {
    const profile = await getMyProfile();
    const header = renderHeader(profile);
    body.firstElementChild.remove();
    body.prepend(header);
}