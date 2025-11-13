import {BaseQueryApi,} from '@reduxjs/toolkit/query/react'
import {setAppError} from '@/app/app-slice';
import {ResultCode} from '@/common/enum';
import {fetchBaseQuery} from '@reduxjs/toolkit/query';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

export function isErrorWithMessage(
    error: unknown,
): error is { message: string } {
    return (
        typeof error === 'object' &&
        error != null &&
        'message' in error &&
        typeof (error as any).message === 'string'
    )
}

export function isFetchBaseQueryError(
    error: unknown,
): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error
}

export const handleError = (
    api: typeof BaseQueryApi,
    result: ReturnType<typeof fetchBaseQuery>
) => {
    let error = 'Some error occurred'

    if (result.error) {
        if (isFetchBaseQueryError(result.error)) {
            // you can access all properties of `FetchBaseQueryError` here
            const errMsg = 'error' in result.error ? result.error.error : JSON.stringify(result.error.data.message)
            api.dispatch(setAppError({error: errMsg}))
        }
        if (result.error.status === 403) {
            api.dispatch(setAppError({error: '403 Forbidden Error. Check API-KEY'}))
        }
        if (result.error.status === 400) {
            if (isErrorWithMessage(result.error.data)) {
                api.dispatch(setAppError({error: result.error.data.message}))
            } else {
                api.dispatch(setAppError({error: JSON.stringify(result.error.data)}))
            }
            if (result.error.status >= 500 && result.error.status < 600) {
                api.dispatch(setAppError({error: 'Server error occurred. Please try again later.'}))
            } else {
                api.dispatch(setAppError({error: JSON.stringify(result.error)}))
            }
        }
    }
    if ((result.data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
        const messages = (result.data as { messages: string[] }).messages
        error = messages.length ? messages[0] : error
        api.dispatch(setAppError({ error }))
    }
}
