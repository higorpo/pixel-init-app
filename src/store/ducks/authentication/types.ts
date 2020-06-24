/**
 * Action types
 */
export enum AuthenticationTypes {
    'AUTHENTICATE_SET_TOKEN' = '@authentication/AUTHENTICATE_SET_TOKEN',
    'UPDATE_PROFILE_PIC' = '@authentication/UPDATE_PROFILE_PIC',
    'SET_USAR_DATA' = '@authentication/SET_USAR_DATA'
};

/**
 * Data types
 */
export interface Authentication {
    mail: string
}

export interface AuthencationError {
    field: string,
    message: string
}

export interface UserAuthenticationProp {
    id: number,
    is_admin: boolean,
    first_name: string,
    last_name: string,
    avatar: string
}

/**
 * State type
 */
export interface AuthenticationState {
    readonly token: string | null,
    readonly user: UserAuthenticationProp | null
}