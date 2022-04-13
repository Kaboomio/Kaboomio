const SUPABASE_URL = 'https://houeghgfcehojgitoeuv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvdWVnaGdmY2Vob2pnaXRvZXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDk2OTM3OTMsImV4cCI6MTk2NTI2OTc5M30.ILc0KmFBK-JZ7zwqJFfF1v1Hcp1IFa3tO1PD3lskmWc';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        const profile = await getMyProfile();
        if (!profile.username) {
            location.replace('../profile-setup');
        } else {
            location.replace('../home-page');
        }
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function createProfile() {
    const response = await client
        .from('profiles')
        .insert({});
    return checkError(response);
}

export async function getMyProfile() {
    const user = getUser();
    const response = await client
        .from('profiles')
        .select()
        .match({ user_id: user.id })
        .single();

    return checkError(response);
}

export async function getAllUsernames() {
    const response = await client
        .from('profiles')
        .select('username');

    const usernames = response.body
        .filter(username => {if (username.username !== null) return username.username;})
        .map(username => username.username.toLowerCase());

    return usernames;
}

export async function updateProfile(username, avatar, bio) {
    const user = getUser();
    const response = await client
        .from('profiles')
        .update({ 
            username, 
            img_url: `../assets/avatars/${avatar}.png`,
            bio
        })
        .match({ user_id: user.id });

    return checkError(response);
}

export async function getProfile(id) {
    const response = await client
        .from('profiles')
        .select('*')
        .match({ id: id })
        .single();

    return response.body;
}

export async function getProfileScores(id) {
    const response = await client
        .from('scores')
        .select('*')
        .match({ profile_id: id });

    return response.body;
}


function checkError({ data, error }) {
    return error ? console.error(error) : data;
}


export async function createScore(score, level, initials, time) {

    const myProfile = await getMyProfile();

    const timeInSeconds = Math.round(Number(time) / 60);

    const scoreObject = {
        score: score,
        level: level,
        initials: initials,
        time: timeInSeconds,
        profile_id: myProfile.id
    };

    console.log(myProfile, timeInSeconds, scoreObject);


    const response = await client
        .from('scores')
        .insert(scoreObject)
        .single();

    return checkError(response);
}

export async function deleteScore(id) {
    const response = await client
        .from('scores')
        .delete()
        .match({ id: id });
    
    return response.body;
}