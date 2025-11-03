import {createAppSlice} from '@/common/utils'
import {LoginInputs} from '@/features/auth/lib/schemas'
import {authApi} from '@/features/auth/api/authApi'
import {handleServerAppError} from '@/common/utils/handleServerAppError'
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError'
import {ResultCode} from '@/common/enum';
import {AUTH_TOKEN} from '@/common/constats';
import {setAppStatus} from '@/app/app-slice';
import {BaseResponseType} from '@/common/types';
import {clearTodolistsAndTasks} from '@/common/actions';

type AuthState = {
    isLoggedIn: boolean
}

const initialState: AuthState = {
    isLoggedIn: false,
}

export const authSlice = createAppSlice({
    name: 'auth',
    initialState,
    selectors: {
        selectIsLoggedIn: (state) => state.isLoggedIn
    },
    reducers: (create) => ({
        setIsLoggedIn: create.reducer((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
}),
        loginTC: create.asyncThunk<BaseResponseType<{
            userId: number, token: string
        }>, LoginInputs>(
            async (data, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatus({status: 'loading'}))
                    const res = await authApi.login(data)
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatus({status: 'success'}))
                        localStorage.setItem(AUTH_TOKEN, res.data.data.token)
                        return res.data
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = true
                }
            }
        ),
        logoutTC: create.asyncThunk<BaseResponseType>(
            async (_, {dispatch, rejectWithValue}) => {
                try {
                    dispatch(setAppStatus({status: 'loading'}))
                    const res = await authApi.logout()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatus({status: 'success'}))
                        localStorage.removeItem(AUTH_TOKEN)
                        dispatch(clearTodolistsAndTasks())
                        return res.data
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = false
                }
            }
        ),
        initializeAppTC: create.asyncThunk(
            async (_, { dispatch, rejectWithValue }) => {
                try {
                    dispatch(setAppStatus({ status: 'loading' }))
                    const res = await authApi.me()
                    if (res.data.resultCode === ResultCode.Success) {
                        dispatch(setAppStatus({ status: 'succeeded' }))
                        return { isLoggedIn: true }
                    } else {
                        handleServerAppError(res.data, dispatch)
                        return rejectWithValue(null)
                    }
                } catch (error: any) {
                    handleServerNetworkError(error, dispatch)
                    return rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn
                },
            }
        ),
    }),
})

export const {selectIsLoggedIn} = authSlice.selectors
export const {loginTC, logoutTC, initializeAppTC} = authSlice.actions
export const authReducer = authSlice.reducer
