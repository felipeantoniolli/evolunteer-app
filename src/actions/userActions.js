export const LOGIN = 'LOGIN';
export const login = (user) => ({
    type: LOGIN,
    user
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: 'LOGOUT'
});

export const SET_INTEREST = 'SET_INTEREST';
export const setInterest = (interest) => ({
    type: SET_INTEREST,
    interest
}); 