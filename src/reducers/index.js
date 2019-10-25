import { combineReducers } from 'redux';
import loginDataReducer from './loginDataReducer';
import userReducer from './userReducer';
import registerReducer from './registerReducer';
import searchReducer from './searchReducer';
import institutionsReducer from './institutionsReducer';
import institutionDetailReducer from './institutionDetailReducer';

const rootReducer = combineReducers({
    login: loginDataReducer,
    search: searchReducer,
    user: userReducer,
    register: registerReducer,
    institutions: institutionsReducer,
    institutionDetail: institutionDetailReducer
});

export default rootReducer;