import { LOGIN, LOGOUT } from '../actions/loginActions';

const userReducer = (state = [], action) => {
    switch(action.type) {
        case LOGIN:
            return action.user;
        case LOGOUT:
            return {};
        default:
            return state;
    }
};

export default userReducer;