import { SET_TERM_SEARCH } from '../actions/searchActions';

const INITIAL_STATE = {
    term: ''
}

const searchReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_TERM_SEARCH:
            return action.term;
        default:
            return state;
    }
};

export default searchReducer;