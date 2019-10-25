import { SET_INSTITUTION_DETAIL_DATA } from '../actions/institutionsActions';

const INITIAL_STATE = {
    user: ''
}

const institutionDetailReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_INSTITUTION_DETAIL_DATA:
            return action.user;
        default:
            return state;
    }
};

export default institutionDetailReducer;