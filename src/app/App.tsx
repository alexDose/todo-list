import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import {useAppSelector} from '@/common/hooks/useAppSelector'
import CssBaseline from '@mui/material/CssBaseline'
import {selectThemeMode} from './app-selectors';
import {getTheme} from '@/common/theme/theme';
import {Header} from '@/common/components/Header/Header';
import {Main} from '@/app/Main';

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className={'app'}>
                <CssBaseline/>
                <Header/>
                <Main/>
            </div>
        </ThemeProvider>
    )
}
