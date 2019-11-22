import React from 'react';
import { AsyncStorage } from 'react-native';
import { LOGIN, LOGOUT, SET_INTEREST, SET_UPDATE_DATA } from '../actions/userActions';

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
            let interest = state.interest;

            interest.push(
                {
                    "id_interest": action.interest.id_interest,
                    "type": action.interest.type
                }
            );

            return {
                ...state,
                interest
            };
        case SET_UPDATE_DATA:
            let interestData = state.interest;

            let newUser = action.user;

            newUser['interest'] = interestData;

            return newUser;
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