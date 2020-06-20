import { action } from 'typesafe-actions';
import { PublicationsTypes, PublicationsState } from './types';

const request = (page: number = 1) => action(PublicationsTypes.REQUEST, { page });

const refresh = () => action(PublicationsTypes.REQUEST, { refreshing: true });

const success = (data: PublicationsState) => action(PublicationsTypes.SUCCESS, { ...data });

const failure = () => action(PublicationsTypes.FAILURE);

const PublicationsActions = {
    request,
    refresh,
    success,
    failure
}

export default PublicationsActions;
