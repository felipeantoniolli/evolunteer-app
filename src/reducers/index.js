import { combineReducers } from 'redux';
import loginDataReducer from './loginDataReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    login: loginDataReducer,
    user: userReducer
});

export default rootReducer;