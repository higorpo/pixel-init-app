import { combineReducers } from "redux";
import authentication from './authentication';
import notifications from './notifications';
import publications from './publications';

export default combineReducers({
    authentication,
    notifications,
    publications
})