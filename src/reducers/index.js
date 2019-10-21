import { combineReducers } from 'redux';
import loginDataReducer from './loginDataReducer';
import userReducer from './userReducer';
import registerReducer from './registerReducer';

const rootReducer = combineReducers({
    login: loginDataReducer,
    user: userReducer,
    register: registerReducer
});

export default rootReducer;