import { SET_VOLUNTEER_DETAIL_DATA } from '../actions/volunteersActions';
const INITIAL_STATE = {
    user: ''
}

const volunteerDetailReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_VOLUNTEER_DETAIL_DATA:
            return action.user;
        default:
            return state;
    }
};

export default volunteerDetailReducer;