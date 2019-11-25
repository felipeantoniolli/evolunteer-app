export const LOGIN = 'LOGIN';
export const login = (user) => ({
    type: LOGIN,
    user
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
    type: 'LOGOUT'
});

export const SET_UPDATE_DATA = "SET_UPDATE_DATA";
export const setUpdateData = (user) => ({
    type: SET_UPDATE_DATA,
    user
});

export const SET_INTEREST = 'SET_INTEREST';
export const setInterest = (interest) => ({
    type: SET_INTEREST,
    interest
}); 

export const SET_IMAGE_DATA = 'SET_IMAGE_DATA';
export const setImageData = (image) => ({
    type: SET_IMAGE_DATA,
    image
});