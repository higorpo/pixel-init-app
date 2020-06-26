/**
 * Action types
 */
export enum PublicationsTypes {
    'REQUEST' = '@publications/REQUEST',
    'SUCCESS' = '@publications/SUCCESS',
    'FAILURE' = '@publications/FAILURE',
}

/**
 * Data types
 */

export interface Publication {
    id: number,
    user_id: number,
    text: string,
    is_liked: boolean,
    author: {
        id: number,
        first_name: string,
        last_name: string,
        avatar: string
    },
    created_at: string,
    updated_at: string,
    __meta__: {
        likes_count: number,
        comments_count: number
    }
}

/**
 * State types
 */
export interface PublicationsState {
    readonly loading: boolean,
    readonly loading_more: boolean,
    readonly refreshing: boolean,
    readonly error: boolean | number,
    readonly total: number,
    readonly perPage: number,
    readonly page: number,
    readonly lastPage: number,
    readonly data: Publication[]
}