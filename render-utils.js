{/* <div class="header-left">
    <div>
        <img src="../assets/avatars/mario.png" alt="" id="avatar-icon">
    </div>
    <h1>It's a me, rileyjhoff</h1>
</div>
<div class="header-right">
    <div class="icons">
        <a href="../home-page/">
            <img src="../assets/home-icon.png" id="home-icon" />
        </a>
    </div>
    <div class="icons">
        <a href="../leaderboard/">
            <img src="../assets/trophy-icon.png" id="trophy-icon" />
        </a>
    </div>
    <div class="icons">
        <a href="../profile-page/">
            <img src="../assets/settings-icon.png" id="settings-icon" />
        </a>
    </div>
    <div class="icons">
        <a>
            <img src="../assets/logout-icon.png" id="logout-icon" />
        </a>
    </div>
</div> */}

export function renderHeader(profile, userId) {
    const header = document.createElement('header');
    const headerLeft = document.createElement('div');
    const avatarDiv = document.createElement('div');
    const avatarImg = document.createElement('img');
    const nameEl = document.createElement('h1');
    const headerRight = document.createElement('div');
    const homeDiv = document.createElement('div');
    const homeAnchor = document.createElement('a');
    const homeImg = document.createElement('img');
    const leaderboardDiv = document.createElement('div');
    const leaderboardAnchor = document.createElement('a');
    const leaderboardImg = document.createElement('img');
    const settingsDiv = document.createElement('div');
    const settingsAnchor = document.createElement('a');
    const settingsImg = document.createElement('img');
    const logoutDiv = document.createElement('div');
    const logoutAnchor = document.createElement('a');
    const logoutImg = document.createElement('img');

    headerLeft.classList.add('header-left');
    avatarImg.id = 'avatar-icon';
    avatarDiv.id = 'avatar-div';
    headerRight.classList.add('header-right');
    homeDiv.classList.add('icons');
    homeImg.id = 'home-icon';
    homeImg.src = '../assets/home-icon.png';
    homeAnchor.href = '../home-page';
    leaderboardDiv.classList.add('icons');
    leaderboardImg.id = 'trophy-icon';
    leaderboardImg.src = '../assets/trophy-icon.png';
    leaderboardAnchor.href = '../leaderboard';
    settingsDiv.classList.add('icons');
    settingsImg.id = 'settings-icon';
    settingsImg.src = '../assets/settings-icon.png';
    logoutDiv.classList.add('icons');
    logoutImg.id = 'logout-icon';
    logoutImg.src = '../assets/logout-icon.png';
    logoutAnchor.id = 'logout';
    
    if (!profile.username) {
        settingsAnchor.href = '../profile-setup';
    } else {
        settingsAnchor.href = `../profile-page/?id=${profile.id}`;
    }
    if (!profile.img_url) {
        avatarImg.src = '../assets/avatars/mario.png';
    } else {
        avatarImg.src = `${profile.img_url}`;
    }
    if (userId === 'about') {
        nameEl.textContent = `Meet the Kaboomio Team`;
        if (!profile.username) {
            settingsImg.style.animation = 'pulse 2s infinite ease-in-out';
        }
    } else if (!profile.username) {
        nameEl.textContent = 'Dont forget to finish profile setup!';
        settingsImg.style.animation = 'pulse 2s infinite ease-in-out';
    } else if (profile.user_id === userId) {
        nameEl.textContent = `View and Edit Profile`;
    } else if (userId) {
        nameEl.textContent = `${profile.username}'s profile`;
    } else if (window.location.pathname === '/home-page/') {
        nameEl.textContent = `It's a me, ${profile.username}`;
    } else if (window.location.pathname === '/leaderboard/') {
        nameEl.textContent = `Leaderboard`;
        headerLeft.style.justifyItems = 'center';
    }

    avatarDiv.append(avatarImg);
    if (userId || !profile.username || window.location.pathname === '/leaderboard/') {
        headerLeft.append(nameEl);
    } else {
        headerLeft.append(avatarDiv, nameEl);
    }
    homeAnchor.append(homeImg);
    leaderboardAnchor.append(leaderboardImg);
    if (userId === 'about') {
        homeDiv.append();
        leaderboardDiv.append(leaderboardAnchor);
    } else if (!profile.username) {
        homeDiv.append();
        leaderboardDiv.append();
    } else {
        homeDiv.append(homeAnchor);
        leaderboardDiv.append(leaderboardAnchor);
    }
    settingsAnchor.append(settingsImg);
    settingsDiv.append(settingsAnchor);
    logoutAnchor.append(logoutImg);
    logoutDiv.append(logoutAnchor);
    headerRight.append(homeDiv, leaderboardDiv, settingsDiv, logoutDiv);
    header.append(headerLeft, headerRight);

    return header;
}