import { logout, client, getMyProfile, getUser } from '../fetch-utils.js';
import { renderHeader } from '../render-utils.js';

// checkAuth();

const body = document.querySelector('body');
const scoreContainerEl = document.querySelector('.score-container');
const sortParameter = document.getElementById('sort-param');
const ascdescSelect = document.getElementById('sort-asc-desc');
const loadingScreen = document.querySelector('.loading-screen');


document.addEventListener('click', (e) => {
    if (e.path[0].id === 'logout' || e.path[0].id === 'logout-icon') {
        logout();
    }
});

window.addEventListener('load', async () => {
    loadingScreen.classList.toggle('invisible');
    await fetchandDisplayLeaderboard();
    if (getUser()) {
        await fetchandDisplayHeader();
    }
    loadingScreen.classList.toggle('invisible');
});

scoreContainerEl.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (clientHeight + scrollTop >= scrollHeight){
        console.log(clientHeight);
    }
});

sortParameter.addEventListener('change', fetchandDisplayLeaderboard);

ascdescSelect.addEventListener('change', fetchandDisplayLeaderboard);


async function getLeaderboard(type, trueFalse){
    const response = await client
        .from('scores')
        .select('*')
        .order(type, { ascending: trueFalse })
        .range(0, 20);

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
        scoreEl.classList.add('score');


        scoreInitials.textContent = `${score.initials}...........`;
        scoreScores.textContent = `${score.score}............`;
        scoreTime.textContent = `${score.time}`;

        scoreEl.append(scoreInitials, scoreScores, scoreTime);

        scoreEl.addEventListener('click', () => {
            window.location.replace(`../profile-page/?id=${score.profile_id}`);
        });
        
        scoreContainerEl.append(scoreEl);

    }
}

async function fetchandDisplayHeader() {
    const profile = await getMyProfile();
    const hardHeader = document.querySelector('header');
    body.removeChild(hardHeader);
    const header = renderHeader(profile);
    body.prepend(header);
}