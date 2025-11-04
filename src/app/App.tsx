import styles from './App.module.css'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import CssBaseline from '@mui/material/CssBaseline'
import {getTheme} from '@/common/theme'
import {Header} from '@/common/components'
import {useAppDispatch, useAppSelector} from '@/common/hooks';
import {selectThemeMode, setIsLoggedIn} from '@/app/app-slice';
import {ErrorSnackbar} from '@/common/components/ErrorSnackbar/ErrorSnackbar';
import {Routing} from '@/common/routing/Routing';
import {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {useMeQuery} from '@/features/auth/api/authApi';
import {ResultCode} from '@/common/enum';

export const App = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)

    const { data, isLoading } = useMeQuery()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isLoading) return
        if (data?.resultCode === ResultCode.Success) {
           dispatch(setIsLoggedIn({isLoggedIn: true}))
        }
    }, [isLoading])

    if (isLoading) {
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
