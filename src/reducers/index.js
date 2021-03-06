import { combineReducers } from 'redux';
import loginDataReducer from './loginDataReducer';
import userReducer from './userReducer';
import registerReducer from './registerReducer';
import searchReducer from './searchReducer';
import institutionsReducer from './institutionsReducer';
import institutionDetailReducer from './institutionDetailReducer';
import volunteersReducer from './volunteersReducer';
import volunteerDetailReducer from './volunteerDetailReducer';
import registerWorkReducer from './registerWorkReducer';
import worksReducer from './worksReducer';
import calendarReducer from './calendarReducer';

const rootReducer = combineReducers({
    login: loginDataReducer,
    search: searchReducer,
    user: userReducer,
    register: registerReducer,
    institutions: institutionsReducer,
    institutionDetail: institutionDetailReducer,
    volunteers: volunteersReducer,
    volunteerDetail: volunteerDetailReducer,
    works: worksReducer,
    registerWork: registerWorkReducer,
    calendar: calendarReducer
});

export default rootReducer;