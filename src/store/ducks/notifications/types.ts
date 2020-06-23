/**
 * Action types
 */
export enum NotificationsTypes {
    'REQUEST' = '@notifications/REQUEST',
    'SUCCESS' = '@notifications/SUCCESS',
    'FAILURE' = '@notifications/FAILURE',
}

/**
 * Data types
 */
export interface Notification {
    id: number;
    user_id: number;
    type: "alert" | "request_connection",
    text: string;
    connection_request_user_id?: number | null;
    connection_requested_by_user: {
        id: number,
        first_name: string,
        last_name: string,
        avatar: string | null
    }
    created_at: Date,
    updated_at: Date,
}

/**
 * State types
 */
export interface NotificationsState {
    readonly loading: boolean,
    readonly loading_more: boolean,
    readonly refreshing: boolean,
    readonly error: boolean | number,
    readonly total: number,
    readonly perPage: number,
    readonly page: number,
    readonly lastPage: number,
    readonly data: Notification[]
}