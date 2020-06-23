import { action } from 'typesafe-actions';
import { AuthenticationTypes, UserAuthenticationProp } from './types';

const setToken = (token: string, user: UserAuthenticationProp) => action(AuthenticationTypes.AUTHENTICATE_SET_TOKEN, { token, user });

const setProfilePic = (profile_pic: string) => action(AuthenticationTypes.UPDATE_PROFILE_PIC, { profile_pic });


const AuthenticationActions = {
    setToken,
    setProfilePic
}

export default AuthenticationActions;