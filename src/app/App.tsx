import './App.css'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { getTheme } from '@/common/theme'
import { Header } from '@/common/components'
import { Main } from '@/app/Main'
import {useAppSelector} from '@/common/hooks';
import {selectThemeMode} from '@/app/app-slice';

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className={'app'}>
                <CssBaseline />
                <Header />
                <Main />
            </div>
        </ThemeProvider>
    )
}
