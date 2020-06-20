import { combineReducers } from "redux";
import authentication from './authentication';
import notifications from './notifications';

export default combineReducers({
    authentication,
    notifications
})