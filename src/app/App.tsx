import styles from './App.module.css'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from '@/common/theme'
import {Header} from '@/common/components'
import {useAppDispatch, useAppSelector} from '@/common/hooks';
import {selectThemeMode} from '@/app/app-slice';
import {ErrorSnackbar} from '@/common/components/ErrorSnackbar/ErrorSnackbar';
import {Routing} from '@/common/routing/Routing';
import {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useEffect} from 'react';
import {initializeAppTC} from '@/features/auth/model/auth-slice';

export const App = () => {
    const [isInitialized, setIsInitialized] = useState(false)
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
            .finally(() => {
                setIsInitialized(true)
            })
    }, [])

    if (!isInitialized) {
        return (
            <div className={styles.circularProgressContainer}>
                <CircularProgress size={150} thickness={3} />
            </div>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.app}>
                <CssBaseline/>
                <Header/>
                <Routing/>
                <ErrorSnackbar/>
            </div>
        </ThemeProvider>
    )
}
