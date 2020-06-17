import { Reducer } from 'redux';
import { AuthenticationState, AuthenticationTypes } from './types';

const INITIAL_STATE: AuthenticationState = {
    token: null,
    user_id: null
};

const reducer: Reducer<AuthenticationState> = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AuthenticationTypes.AUTHENTICATE_SET_TOKEN:
            return {
                token: action.payload.token,
                user_id: action.payload.user_id
            }
        default:
            return state;
    }
}

export default reducer;