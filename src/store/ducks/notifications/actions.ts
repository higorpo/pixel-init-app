import { action } from 'typesafe-actions';
import { NotificationsTypes, NotificationsState } from './types';

const request = (page: number = 1) => action(NotificationsTypes.REQUEST, { page });

const refresh = () => action(NotificationsTypes.REQUEST, { refreshing: true });

const success = (data: NotificationsState) => action(NotificationsTypes.SUCCESS, { ...data });

const failure = () => action(NotificationsTypes.FAILURE);

const NotificationsActions = {
    request,
    refresh,
    success,
    failure
}

export default NotificationsActions;
