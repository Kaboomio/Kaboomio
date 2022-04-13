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
    const homeTooltip = document.createElement('span');
    const leaderboardDiv = document.createElement('div');
    const leaderboardAnchor = document.createElement('a');
    const leaderboardImg = document.createElement('img');
    const leaderboardTooltip = document.createElement('span');
    const settingsDiv = document.createElement('div');
    const settingsAnchor = document.createElement('a');
    const settingsImg = document.createElement('img');
    const settingsTooltip = document.createElement('span');
    const logoutDiv = document.createElement('div');
    const logoutAnchor = document.createElement('a');
    const logoutImg = document.createElement('img');
    const logoutTooltip = document.createElement('span');

    headerLeft.classList.add('header-left');
    avatarImg.id = 'avatar-icon';
    avatarImg.draggable = false;
    avatarDiv.id = 'avatar-div';
    headerRight.classList.add('header-right');
    homeDiv.classList.add('icons');
    homeImg.id = 'home-icon';
    homeImg.src = '../assets/home-icon.png';
    homeImg.draggable = false;
    homeAnchor.draggable = false;
    homeAnchor.href = '../home-page';
    homeTooltip.textContent = 'Home';
    homeTooltip.classList.add('tooltip');
    leaderboardDiv.classList.add('icons');
    leaderboardImg.id = 'trophy-icon';
    leaderboardImg.src = '../assets/trophy-icon.png';
    leaderboardImg.draggable = false;
    leaderboardAnchor.draggable = false;
    leaderboardAnchor.href = '../leaderboard';
    leaderboardTooltip.textContent = 'Leaderboard';
    leaderboardTooltip.classList.add('tooltip');
    settingsDiv.classList.add('icons');
    settingsImg.id = 'settings-icon';
    settingsImg.src = '../assets/settings-icon.png';
    settingsImg.draggable = false;
    settingsAnchor.draggable = false;
    settingsTooltip.classList.add('tooltip');
    logoutDiv.classList.add('icons');
    logoutImg.id = 'logout-icon';
    logoutImg.src = '../assets/logout-icon.png';
    logoutImg.draggable = false;
    logoutAnchor.id = 'logout';
    logoutAnchor.draggable = false;
    logoutTooltip.textContent = 'Logout';
    logoutTooltip.classList.add('tooltip');
    
    if (!profile.username) {
        settingsAnchor.href = '../profile-setup';
        settingsTooltip.textContent = 'Profile Setup';
    } else {
        settingsAnchor.href = `../profile-page/?id=${profile.id}`;
        settingsTooltip.textContent = 'Edit Profile';
    }
    if (!profile.img_url) {
        avatarImg.src = 'https://houeghgfcehojgitoeuv.supabase.co/storage/v1/object/public/avatars/mario.png';
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
        leaderboardDiv.append(leaderboardAnchor, leaderboardTooltip);
        if (profile) {
            homeDiv.append(homeAnchor, homeTooltip);
        }
    } else if (!profile.username) {
        homeDiv.append();
        leaderboardDiv.append();
    } else {
        homeDiv.append(homeAnchor, homeTooltip);
        leaderboardDiv.append(leaderboardAnchor, leaderboardTooltip);
    }
    settingsAnchor.append(settingsImg);
    settingsDiv.append(settingsAnchor, settingsTooltip);
    logoutAnchor.append(logoutImg);
    logoutDiv.append(logoutAnchor, logoutTooltip);
    headerRight.append(homeDiv, leaderboardDiv, settingsDiv, logoutDiv);
    header.append(headerLeft, headerRight);

    return header;
}