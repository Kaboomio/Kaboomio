export function renderHomeHeader(profile) {
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
    avatarImg.src = `${profile.img_url}`;
    avatarImg.draggable = false;
    nameEl.textContent = `It's a me, ${profile.username}`;
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
    settingsAnchor.href = `../profile-page/?id=${profile.id}`;
    settingsTooltip.textContent = 'Edit Profile';
    settingsTooltip.classList.add('tooltip');
    logoutDiv.classList.add('icons');
    logoutImg.id = 'logout-icon';
    logoutImg.src = '../assets/logout-icon.png';
    logoutImg.draggable = false;
    logoutAnchor.id = 'logout';
    logoutAnchor.draggable = false;
    logoutTooltip.textContent = 'Logout';
    logoutTooltip.classList.add('tooltip');

    avatarDiv.append(avatarImg);
    
    homeAnchor.append(homeImg);
    leaderboardAnchor.append(leaderboardImg);
    settingsAnchor.append(settingsImg);
    logoutAnchor.append(logoutImg);
    
    homeDiv.append(homeAnchor, homeTooltip);
    leaderboardDiv.append(leaderboardAnchor, leaderboardTooltip);
    settingsDiv.append(settingsAnchor, settingsTooltip);
    logoutDiv.append(logoutAnchor, logoutTooltip);
    
    headerLeft.append(avatarDiv, nameEl);
    headerRight.append(homeDiv, leaderboardDiv, settingsDiv, logoutDiv);

    header.append(headerLeft, headerRight);

    return header;
}

export function renderLeaderboardHeader(profile) {
    const header = document.createElement('header');
    const headerLeft = document.createElement('div');
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

    // CONDITIONAL ELEMENT ATTRIBUTES IF USER HAS NOT FINISHED PROFILE SETUP
    if (!profile.username) {
        nameEl.textContent = 'Dont forget to finish profile setup!';
        settingsImg.style.animation = 'pulse 2s infinite ease-in-out';
        settingsAnchor.href = '../profile-setup';
        settingsTooltip.textContent = 'Profile Setup';
    } else {
        nameEl.textContent = `Leaderboard`;
        settingsAnchor.href = `../profile-page/?id=${profile.id}`;
        settingsTooltip.textContent = 'Edit Profile';
    }

    homeAnchor.append(homeImg);
    leaderboardAnchor.append(leaderboardImg);
    settingsAnchor.append(settingsImg);
    logoutAnchor.append(logoutImg);

    // CONDITIONAL APPENDING IF USER HAS NOT FINISHED PROFILE SETUP
    if (!profile.username) {
        homeDiv.append();
        leaderboardDiv.append();
    } else {
        homeDiv.append(homeAnchor, homeTooltip);
        leaderboardDiv.append(leaderboardAnchor, leaderboardTooltip);
    }
    settingsDiv.append(settingsAnchor, settingsTooltip);
    logoutDiv.append(logoutAnchor, logoutTooltip);

    headerLeft.append(nameEl);
    headerRight.append(homeDiv, leaderboardDiv, settingsDiv, logoutDiv);

    header.append(headerLeft, headerRight);

    return header;
}

export function renderProfileHeader(profile, userId) {
    const header = document.createElement('header');
    const headerLeft = document.createElement('div');
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
    
    // CONDITIONAL ELEMENT ATTRIBUTES IF USER HAS NOT FINISHED PROFILE SETUP
    if (!profile.username) {
        settingsAnchor.href = '../profile-setup';
        settingsTooltip.textContent = 'Profile Setup';
        settingsImg.style.animation = 'pulse 2s infinite ease-in-out';
    } else {
        settingsAnchor.href = `../profile-page/?id=${profile.id}`;
        settingsTooltip.textContent = 'Edit Profile';
    }
    
    // CONDITIONAL HEADER TEXT IF USER HAS NOT FINISHED PROFILE SETUP, IS ON THEIR PROFILE, OR IS ON ANOTHER USER'S PROFILE
    if (!profile.username) {
        nameEl.textContent = 'Dont forget to finish profile setup!';
    } else if (profile.user_id === userId) {
        nameEl.textContent = `View and Edit Profile`;
    } else if (userId) {
        nameEl.textContent = `${profile.username}'s profile`;
    }

    homeAnchor.append(homeImg);
    leaderboardAnchor.append(leaderboardImg);
    settingsAnchor.append(settingsImg);
    logoutAnchor.append(logoutImg);

    // CONDITIONAL APPENDING IF USER HAS NOT FINISHED PROFILE SETUP
    if (!profile.username) {
        homeDiv.append();
        leaderboardDiv.append();
    } else {
        homeDiv.append(homeAnchor, homeTooltip);
        leaderboardDiv.append(leaderboardAnchor, leaderboardTooltip);
    }
    settingsDiv.append(settingsAnchor, settingsTooltip);
    logoutDiv.append(logoutAnchor, logoutTooltip);

    headerLeft.append(nameEl);
    headerRight.append(homeDiv, leaderboardDiv, settingsDiv, logoutDiv);

    header.append(headerLeft, headerRight);

    return header;
}

export function renderAboutHeader(profile) {
    const header = document.createElement('header');
    const headerLeft = document.createElement('div');
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
    nameEl.textContent = `Meet the Kaboomio Team`;

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
    
    // CONDITIONAL ELEMENT ATTRIBUTES IF USER HAS NOT FINISHED PROFILE SETUP
    if (!profile.username) {
        nameEl.textContent = 'Dont forget to finish profile setup!';
        settingsImg.style.animation = 'pulse 2s infinite ease-in-out';
        settingsAnchor.href = '../profile-setup';
        settingsTooltip.textContent = 'Profile Setup';
    } else {
        settingsAnchor.href = `../profile-page/?id=${profile.id}`;
        settingsTooltip.textContent = 'Edit Profile';
    }

    
    homeAnchor.append(homeImg);
    leaderboardAnchor.append(leaderboardImg);
    settingsAnchor.append(settingsImg);
    logoutAnchor.append(logoutImg);

    // CONDITIONAL APPENDING IF USER HAS NOT FINISHED PROFILE SETUP
    if (!profile.username) {
        homeDiv.append();
    } else {
        homeDiv.append(homeAnchor, homeTooltip);
    }
    leaderboardDiv.append(leaderboardAnchor, leaderboardTooltip);
    settingsDiv.append(settingsAnchor, settingsTooltip);
    logoutDiv.append(logoutAnchor, logoutTooltip);
    
    headerLeft.append(nameEl);
    headerRight.append(homeDiv, leaderboardDiv, settingsDiv, logoutDiv);

    header.append(headerLeft, headerRight);

    return header;
}

export function renderMarioHeader(profile) {
    const header = document.createElement('header');
    const headerLeft = document.createElement('div');
    const avatarDiv = document.createElement('div');
    const avatarImg = document.createElement('img');
    const nameEl = document.createElement('h1');
    const headerMiddle = document.createElement('div');
    const fullscreenButton = document.createElement('button');
    const muteButton = document.createElement('button');
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
    avatarImg.src = `${profile.img_url}`;
    avatarDiv.id = 'avatar-div';
    nameEl.textContent = `It's a me, ${profile.username}`;

    headerMiddle.id = 'toggle-fullscreen';
    fullscreenButton.id = 'fullscreen';
    fullscreenButton.textContent = 'Fullscreen';
    muteButton.id = 'mute';
    muteButton.textContent = 'Mute';

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
    settingsAnchor.href = `../profile-page/?id=${profile.id}`;
    settingsTooltip.textContent = 'Edit Profile';
    settingsTooltip.classList.add('tooltip');
    logoutDiv.classList.add('icons');
    logoutImg.id = 'logout-icon';
    logoutImg.src = '../assets/logout-icon.png';
    logoutImg.draggable = false;
    logoutAnchor.id = 'logout';
    logoutAnchor.draggable = false;
    logoutTooltip.textContent = 'Logout';
    logoutTooltip.classList.add('tooltip');

    avatarDiv.append(avatarImg);

    homeAnchor.append(homeImg);
    leaderboardAnchor.append(leaderboardImg);
    settingsAnchor.append(settingsImg);
    logoutAnchor.append(logoutImg);

    homeDiv.append(homeAnchor, homeTooltip);
    leaderboardDiv.append(leaderboardAnchor, leaderboardTooltip);
    settingsDiv.append(settingsAnchor, settingsTooltip);
    logoutDiv.append(logoutAnchor, logoutTooltip);
    
    headerLeft.append(avatarDiv, nameEl);
    headerMiddle.append(fullscreenButton, muteButton);
    headerRight.append(homeDiv, leaderboardDiv, settingsDiv, logoutDiv);

    header.append(headerLeft, headerMiddle, headerRight);

    return header;
}