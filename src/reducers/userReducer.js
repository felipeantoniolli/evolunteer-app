import React from 'react';
import { AsyncStorage } from 'react-native';
import { LOGIN, LOGOUT, SET_INTEREST } from '../actions/userActions';

const INITIAL_STATE = {
    username: '',
    token: '',
    interest: []
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            setToken(action.user.token);

            return action.user;
        case LOGOUT:
            setToken('');

            return INITIAL_STATE;
        case SET_INTEREST:
            const actionInterest = action.interest;
            const interest = state.interest;

            interest.push(
                {
                    actionInterest
                }
            );

            return {
                ...state,
                interest
            };
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