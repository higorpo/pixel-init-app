import { action } from 'typesafe-actions';
import { AuthenticationTypes, UserAuthenticationProp } from './types';

const setToken = (token: string, user: UserAuthenticationProp) => action(AuthenticationTypes.AUTHENTICATE_SET_TOKEN, { token, user });


const AuthenticationActions = {
    setToken
}

export default AuthenticationActions;