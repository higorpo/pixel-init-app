import { all, takeLeading } from 'redux-saga/effects';
import { NotificationsTypes } from './notifications/types';
import { loadNotifications } from './notifications/sagas';
import { PublicationsTypes } from './publications/types';
import { loadPublications } from './publications/sagas';

export default function* rootSaga() {
    return yield all([
        takeLeading(NotificationsTypes.REQUEST, loadNotifications),
        takeLeading(PublicationsTypes.REQUEST, loadPublications)
    ])
}