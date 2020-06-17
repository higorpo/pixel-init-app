/**
 * Action types
 */
export enum AuthenticationTypes {
    'AUTHENTICATE_SET_TOKEN' = '@authentication/AUTHENTICATE_SET_TOKEN',
};

/**
 * Data types
 */
export interface Authentication {
    mail: string,
    password: string
}

export interface AuthencationError {
    field: string,
    message: string
}

/**
 * State type
 */
export interface AuthenticationState {
    readonly token: string | null,
    readonly user_id: number | null
}