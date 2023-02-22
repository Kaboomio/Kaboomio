const SUPABASE_URL = 'https://rwbjopjlvkaogcdsnhcg.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3YmpvcGpsdmthb2djZHNuaGNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2NTY4NzAsImV4cCI6MTk5MjIzMjg3MH0.O50ts5I4I75eHb527-c07WYcZSDu5g3xkBxCvFkdDuM';
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
    const user = getUser();
    const response = await client.from('profiles').insert({ user_id: user.id });
    return checkError(response);
}

export async function getMyProfile() {
    const user = getUser();
    const response = await client.from('profiles').select().match({ user_id: user.id }).single();

    return checkError(response);
}

export async function getAllUsernames() {
    const response = await client.from('profiles').select('username');

    const usernames = response.body
        .filter((username) => {
            if (username.username !== null) return username.username;
        })
        .map((username) => username.username.toLowerCase());

    return usernames;
}

export async function updateProfile(username, avatar, bio) {
    const user = getUser();
    const response = await client
        .from('profiles')
        .update({
            username,
            img_url: `https://rwbjopjlvkaogcdsnhcg.supabase.co/storage/v1/object/public/avatars/${avatar}.png`,
            bio,
        })
        .match({ user_id: user.id });

    return checkError(response);
}

export async function getProfile(id) {
    const response = await client.from('profiles').select('*').match({ id: id }).single();

    return response.body;
}

export async function getProfileScores(id) {
    const response = await client.from('scores').select('*').match({ profile_id: id });

    return response.body;
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

export async function createScore(score, level, initials, time) {
    const myProfile = await getMyProfile();

    const scoreObject = {
        score: score,
        level: level,
        initials: initials,
        time: time,
        profile_id: myProfile.id,
    };

    const response = await client.from('scores').insert(scoreObject).single();

    return checkError(response);
}

export async function deleteScore(id) {
    const response = await client.from('scores').delete().match({ id: id }).single();

    return response.body;
}
