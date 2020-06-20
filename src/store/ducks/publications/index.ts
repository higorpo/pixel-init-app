import { Reducer } from 'redux';
import { PublicationsState, PublicationsTypes } from './types';

const INITIAL_STATE: PublicationsState = {
    loading: true,
    loading_more: false,
    refreshing: false,
    error: false,
    total: 0,
    page: 0,
    perPage: 0,
    lastPage: 0,
    data: []
}

const reducer: Reducer<PublicationsState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PublicationsTypes.REQUEST:
            if (action.payload.page == 1) {
                if (action.payload?.refreshing) {
                    state = {
                        ...state,
                        loading: false,
                        loading_more: false,
                        refreshing: true,
                        error: false
                    }
                    return state;
                } else {
                    state = {
                        loading: true,
                        loading_more: false,
                        refreshing: false,
                        error: false,
                        lastPage: 0,
                        page: 0,
                        perPage: 0,
                        total: 0,
                        data: action.payload?.query?.length == 0 ? [] : state.data
                    }
                    return state;
                }
            } else {
                state = {
                    ...state,
                    loading: false,
                    refreshing: false,
                    loading_more: true,
                    error: false
                }
                return state;
            }
        case PublicationsTypes.SUCCESS:
            if (action.payload.page < 2) {
                // Está carregando a primeira página
                state = {
                    loading: false,
                    loading_more: false,
                    refreshing: false,
                    error: false,

                    total: action.payload.total,
                    page: action.payload.page,
                    perPage: action.payload.perPage,
                    lastPage: action.payload.lastPage,

                    data: action.payload.data
                }
            } else {
                // Está carregando mais dados
                state = {
                    loading: false,
                    loading_more: false,
                    refreshing: false,
                    error: false,

                    total: action.payload.total,
                    page: action.payload.page,
                    perPage: action.payload.perPage,
                    lastPage: action.payload.lastPage,

                    data: [...state.data, ...action.payload.data]
                }
            }
            return state;
        case PublicationsTypes.FAILURE:
            state = {
                ...state,
                loading: false,
                loading_more: false,
                refreshing: false,
                error: true
            }
            return state;
        default:
            return state;
    }
}

export default reducer;
