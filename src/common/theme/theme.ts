import { createTheme } from '@mui/material'
import { ThemeMode } from '@/app/app-slice'

export const getTheme = (themeMode: ThemeMode) =>
    createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: 'rgba(59,137,201,0.84)',
            },
        },
    })
