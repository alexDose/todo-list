import {createSlice, isFulfilled, isPending, isRejected} from '@reduxjs/toolkit'
import { RequestStatus } from '@/common/types'
import {todolistsApi} from '@/features/todolists/api/todolistsApi';
import {tasksApi} from '@/features/todolists/api/tasksApi';

export type ThemeMode = 'light' | 'dark'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as string | null,
        isLoggedIn: false,
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isPending, (state, action) => {
                if (todolistsApi.endpoints.getTodolists.matchPending(action)
                || tasksApi.endpoints.getTasks.matchPending(action)) {
                    return
                }
                state.status = "loading"
            })
            .addMatcher(isFulfilled, (state) => {
                state.status = "succeeded"
            })
            .addMatcher(isRejected, (state) => {
                state.status = "failed"
            })
    },
    reducers: (create) => ({
        changeThemeMode: create.reducer((state, action) => {
            state.themeMode = action.payload
        }),
        setAppStatus: create.reducer((state, action) => {
            state.status = action.payload.status
        }),
        setAppError: create.reducer((state, action) => {
            state.error = action.payload.error
        }),
        setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        }),
    }),
    selectors: {
        selectThemeMode: (state) => state.themeMode,
        selectStatus: (state) => state.status,
        selectError: (state) => state.error,
        selectIsLoggedIn: (state) => state.isLoggedIn,
    },
})

export const { changeThemeMode, setAppStatus, setAppError, setIsLoggedIn } = appSlice.actions
export const { selectThemeMode, selectStatus, selectError, selectIsLoggedIn } = appSlice.selectors
export const appReducer = appSlice.reducer
