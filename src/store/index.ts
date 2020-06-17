import { AsyncStorage } from 'react-native';
import { createStore, Store, applyMiddleware } from "redux";
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import logger from 'redux-logger';

import { AuthenticationState } from './ducks/authentication/types';

import rootReducer from "./ducks/rootReducer";
import rootSaga from "./ducks/rootSaga";

export interface ApplicationState {
    authentication: AuthenticationState
}

const persistConfig: PersistConfig<any> = {
    key: "root",
    storage: AsyncStorage,
    whitelist: [
        // 'authentication',
    ],
    timeout: 0,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store: Store<ApplicationState> = createStore(persistedReducer, applyMiddleware(sagaMiddleware, logger));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
