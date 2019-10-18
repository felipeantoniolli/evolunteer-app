import { SET_EMAIL_LOGIN, SET_PASSWORD_LOGIN } from '../actions';

const INITIAL_STATE = {
    email: '',
    password: ''
}

const loginDataReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_EMAIL_LOGIN:
            return {
                ...state,
                email: action.email
            };
        case SET_PASSWORD_LOGIN:
            return {
                ...state,
                password: action.password
            };
        default:
            return state;
    }
};

export default loginDataReducer;