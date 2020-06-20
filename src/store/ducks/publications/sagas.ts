import { CommonActions } from '@react-navigation/native';
import { Alert } from 'react-native';
import { call, put, select } from 'redux-saga/effects';
import api from '~/services/api';
import { ApplicationState } from '~/store';
import PublicationsActions from './actions';

export function* loadPublications(action: any) {
    try {
        const state: ApplicationState = yield select();

        const response = yield call(api.get, `/publications`, {
            params: {
                page: action.payload.page,
            },
            headers: {
                Authorization: `Bearer ${state.authentication.token}`
            }
        })

        yield put(PublicationsActions.success(response.data));
    } catch (error) {
        yield put(PublicationsActions.failure());

        if (!action.payload.refreshing) {
            CommonActions.goBack();
        }

        if (error.response) {
            Alert.alert(`Erro inesperado (${error.response.status})`, "Não foi possível carregar as publicações!");
        } else {
            Alert.alert("Erro inesperado", "Parece que estamos com problemas técnicos no momento, tente novamente mais tarde!");
        }
    }
}