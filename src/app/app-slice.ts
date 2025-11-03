import {createSlice} from '@reduxjs/toolkit'
import {RequestStatus} from '@/common/types'

export type ThemeMode = 'light' | 'dark'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        themeMode: 'light' as ThemeMode,
        status: 'idle' as RequestStatus,
        error: null as string | null,
    },
    reducers: {
        changeThemeMode: (state, action) => {
            state.themeMode = action.payload
        },
        setAppStatus: (state, action) => {
            state.status = action.payload.status
        },
        setAppError: (state, action) => {
            state.error = action.payload.error
        }
    },
    selectors: {
        selectThemeMode: state => state.themeMode,
        selectStatus: state => state.status,
        selectError: state => state.error,
    }
})

export const {changeThemeMode, setAppStatus, setAppError} = appSlice.actions
export const {selectThemeMode, selectStatus, selectError} = appSlice.selectors
export const appReducer = appSlice.reducer
