import { all, takeLeading } from 'redux-saga/effects';
import { NotificationsTypes } from './notifications/types';
import { loadNotifications } from './notifications/sagas';

export default function* rootSaga() {
    return yield all([
        takeLeading(NotificationsTypes.REQUEST, loadNotifications)
    ])
}