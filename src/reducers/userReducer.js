import { LOGIN, LOGOUT } from '../actions';

const INITIAL_STATE = {
    email: '',
    password: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN:
            const user = {
                email: action.email,
                password: action.password
            }

            return user;
        case LOGOUT:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default userReducer;