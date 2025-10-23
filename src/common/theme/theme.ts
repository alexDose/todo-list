import {createTheme} from '@mui/material';
import {ThemeMode} from '@/app/app-reducer';

export const getTheme = (themeMode: ThemeMode) => (createTheme({
        palette: {
            mode: themeMode,
            primary: {
                main: 'rgba(59,137,201,0.84)',
            },
        },
    })
)
