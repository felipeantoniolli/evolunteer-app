import { SET_VOLUNTEERS_DATA } from '../actions/volunteersActions';

const volunteersReducer = (state = [], action) => {
    switch(action.type) {
        case SET_VOLUNTEERS_DATA:
            return action.volunteers;
        default:
            return state;
    }
};

export default volunteersReducer;