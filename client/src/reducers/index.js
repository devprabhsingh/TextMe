import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authReducer from './authReducer';
import searchReducer from './searchReducer'
import chatReducer from './chatReducer'

export default combineReducers({
    auth: authReducer,
    search:searchReducer,
    user:userReducer,
    chat:chatReducer
})