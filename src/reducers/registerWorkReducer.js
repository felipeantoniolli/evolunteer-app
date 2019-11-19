import {
    SET_WORK_NAME_DATA,
    SET_WORK_CONTENT_DATA,
    SET_WORK_DATE_DATA,
    WORK_CLEAR_DATA
} from '../actions/registerWorkActions';

const INITIAL_STATE = {
    name: "",
    content: "",
    work_date: ""
};

const registerWorkReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_WORK_NAME_DATA:
            return {
                ...state,
                name: action.name
            };
        case SET_WORK_CONTENT_DATA:
            return {
                ...state,
                content: action.content
            };
        case SET_WORK_DATE_DATA:
            return {
                ...state,
                work_date: action.work_date
            };
        case WORK_CLEAR_DATA:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default registerWorkReducer;