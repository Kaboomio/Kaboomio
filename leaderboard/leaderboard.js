import { checkAuth, logout, client } from '../fetch-utils.js';

checkAuth();

const scoreContainerEl = document.querySelector('.score-container');
const sortParameter = document.getElementById('sort-param');
const ascdescSelect = document.getElementById('sort-asc-desc');


const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', fetchandDisplayLeaderboard);

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
