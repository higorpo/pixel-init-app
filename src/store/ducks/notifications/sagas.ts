import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';
import { call, put, select } from 'redux-saga/effects';
import api from '~/services/api';
import { ApplicationState } from '~/store';
import NotificationsActions from './actions';

export function* loadNotifications(action: any) {
    try {
        const state: ApplicationState = yield select();

        const response = yield call(api.get, `/notifications`, {
            params: {
                page: action.payload.page,
            },
            headers: {
                Authorization: `Bearer ${state.authentication.token}`
            }
        })

        yield put(NotificationsActions.success(response.data));
    } catch (error) {
        yield put(NotificationsActions.failure());

        if (!action.payload.refreshing) {
            CommonActions.goBack();
        }

        if (error.response) {
            Alert.alert(`Erro inesperado (${error.response.status})`, "Não foi possível carregar as notificações!");
        } else {
            Alert.alert("Erro inesperado", "Parece que estamos com problemas técnicos no momento, tente novamente mais tarde!");
        }
    }
}