import { SET_DATA_LOGIN, SET_PASSWORD_LOGIN } from '../actions/loginActions';

const INITIAL_STATE = {
    data: '',
    password: ''
}

const loginDataReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_DATA_LOGIN:
            return {
                ...state,
                data: action.data
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