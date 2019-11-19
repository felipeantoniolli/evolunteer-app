import {
    SET_WORKS_DATA
} from '../actions/worksActions';

const worksReducer = (state = [], action) => {
    switch(action.type) {
        case SET_WORKS_DATA:
            console.log(action.works);
            return action.works;
        default:
            return state;
    }
};

export default worksReducer;
