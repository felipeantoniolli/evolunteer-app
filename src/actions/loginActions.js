export const LOGIN = 'LOGIN';
export const login = (user) => ({
    type: LOGIN,
    user
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: 'LOGOUT'
});

export const SET_DATA_LOGIN = 'SET_DATA_LOGIN';
export const setDataLogin = (data) => ({
    type: SET_DATA_LOGIN,
    data
});

export const SET_PASSWORD_LOGIN = 'SET_PASSWORD_LOGIN';
export const setPasswordLogin = (password) => ({
    type: SET_PASSWORD_LOGIN,
    password
});
