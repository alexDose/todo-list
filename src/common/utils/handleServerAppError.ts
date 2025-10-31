import type { Dispatch } from '@reduxjs/toolkit'
import {changeAppStatus, setAppError} from '@/app/app-slice';
import {BaseResponseType} from '@/common/types';

export const handleServerAppError = <T,>(data: BaseResponseType<T>, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({ error: data.messages[0] }))
    } else {
        dispatch(setAppError({ error: 'Some error occurred' }))
    }
    dispatch(changeAppStatus({ status: 'failed' }))
}
