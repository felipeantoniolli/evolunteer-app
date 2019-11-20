import {
    SET_CALENDAR_DATA
} from '../actions/calendarActions';

const calendarReducer = (state = [], action) => {
    switch(action.type) {
        case SET_CALENDAR_DATA:
            return action.calendar;
        default:
            return state;
    }
};

export default calendarReducer;
