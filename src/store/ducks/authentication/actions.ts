import { action } from 'typesafe-actions';
import { AuthencationError, Authentication, AuthenticationState, AuthenticationTypes } from './types';

const setToken = (token: string, user_id: number) => action(AuthenticationTypes.AUTHENTICATE_SET_TOKEN, { token, user_id });


const AuthenticationActions = {
    setToken
}

export default AuthenticationActions;