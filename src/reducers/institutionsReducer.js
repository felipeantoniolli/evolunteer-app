import { SET_INSTITUTIONS_DATA } from '../actions/institutionsActions';

const institutionsReducer = (state = [], action) => {
    switch(action.type) {
        case SET_INSTITUTIONS_DATA:
            return action.institutions;
        default:
            return state;
    }
};

export default institutionsReducer;