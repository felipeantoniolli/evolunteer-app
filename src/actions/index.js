export const LOGIN = 'LOGIN';
export const login = (email, password) => ({
    type: LOGIN,
    email,
    password
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: 'LOGOUT'
});

export const SET_EMAIL_LOGIN = 'SET_EMAIL_LOGIN';
export const setEmailLogin = (email) => ({
    type: SET_EMAIL_LOGIN,
    email
});

export const SET_PASSWORD_LOGIN = 'SET_PASSWORD_LOGIN';
export const setPasswordLogin = (password) => ({
    type: SET_PASSWORD_LOGIN,
    password
});

