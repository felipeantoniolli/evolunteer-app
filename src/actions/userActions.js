export const LOGIN = 'LOGIN';
export const login = (user) => ({
    type: LOGIN,
    user
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: 'LOGOUT'
});