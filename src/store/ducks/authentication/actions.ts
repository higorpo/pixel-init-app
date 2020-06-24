import { action } from 'typesafe-actions';
import { AuthenticationTypes, UserAuthenticationProp } from './types';

const setToken = (token: string, user: UserAuthenticationProp) => action(AuthenticationTypes.AUTHENTICATE_SET_TOKEN, { token, user });

const setProfilePic = (profile_pic: string | null) => action(AuthenticationTypes.UPDATE_PROFILE_PIC, { profile_pic });

const setUser = (user: UserAuthenticationProp) => action(AuthenticationTypes.SET_USAR_DATA, { user });


const AuthenticationActions = {
    setToken,
    setProfilePic,
    setUser
}

export default AuthenticationActions;