import {createAppSlice} from '@/common/utils'
import {LoginInputs} from '@/features/auth/lib/schemas'
import {authApi} from '@/features/auth/api/authApi'
import {handleServerAppError} from '@/common/utils/handleServerAppError'
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError'
import {ResultCode} from '@/common/enum';
import {AUTH_TOKEN} from '@/common/constats';

type LoginResponse = {
    resultCode: number
    data: {
        userId: number
    }
    messages: string[]
}

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
        selectIsAuth: (state) => state.isLoggedIn  // ✅ Fixed - removed RootState type
    },
    reducers: (create) => ({
        loginTC: create.asyncThunk<LoginResponse,  // Return type
            LoginInputs    // Argument type
            >(
            async (data, {dispatch, rejectWithValue}) => {
                try {
                    const res = await authApi.login(data)
                    console.log(res.data)
                    if (res.data.resultCode === ResultCode.Success) {
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
    }),
})

export const {selectIsAuth} = authSlice.selectors
export const {loginTC} = authSlice.actions
export const authReducer = authSlice.reducer
