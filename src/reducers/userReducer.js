import React from 'react';
import { AsyncStorage } from 'react-native';
import { LOGIN, LOGOUT } from '../actions/userActions';

const INITIAL_STATE = {
    username: '',
    token: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            const { token } = action.user;

            setToken(token);

            return action.user;
        case LOGOUT:
            setToken('');

            return INITIAL_STATE;
        default:
            return state;
    }
};

const setToken = async (token) => {
    try {
        await AsyncStorage.setItem('user_token', token);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default userReducer;