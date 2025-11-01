import './App.css'
import {ThemeProvider} from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from '@/common/theme'
import {Header} from '@/common/components'
import {useAppSelector} from '@/common/hooks';
import {selectThemeMode} from '@/app/app-slice';
import {ErrorSnackbar} from '@/common/components/ErrorSnackbar/ErrorSnackbar';
import {Routing} from '@/common/routing/Routing';

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    return (
        <ThemeProvider theme={theme}>
            <div className={'app'}>
                <CssBaseline/>
                <Header/>
                <Routing/>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}
