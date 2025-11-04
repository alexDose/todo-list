import MenuIcon from '@mui/icons-material/Menu'
import {NavButton} from '@/common/components'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import {getTheme} from '@/common/theme'
import {changeThemeMode, selectIsLoggedIn, selectStatus, selectThemeMode, setIsLoggedIn} from '@/app/app-slice'
import {containerSx} from '@/common/styles'
import {Clock} from '@/common/components/Clock/Clock'
import LinearProgress from '@mui/material/LinearProgress'
import {PATH} from '@/common/routing/Routing';
import {NavLink} from 'react-router';
import {useLogoutMutation} from '@/features/auth/api/authApi';
import {ResultCode} from '@/common/enum';
import {AUTH_TOKEN} from '@/common/constats';
import {clearTodolistsAndTasks} from '@/common/actions';

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)
    const appStatus = useAppSelector(selectStatus)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const [logout] = useLogoutMutation()

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    const changeThemeModeApp = () => {
        dispatch(changeThemeMode(themeMode === 'light' ? 'dark' : 'light'))
    }
    const logoutHandler = async () => {
        const res = await logout()
        if (res.data.resultCode === ResultCode.Success) {
            dispatch(setIsLoggedIn({isLoggerdIn: false}))
            localStorage.removeItem(AUTH_TOKEN)
            dispatch(clearTodolistsAndTasks())
        }
    }

    return (
        <AppBar position="static" sx={{mb: '30px'}}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        {isLoggedIn && <NavButton onClick={logoutHandler}>Logout</NavButton>}
                        {isLoggedIn && <NavLink to={PATH.FAQ}>
                            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        </NavLink>}
                        <Switch color={'default'} onChange={changeThemeModeApp}/>
                        <Clock/>
                    </div>
                </Container>
            </Toolbar>
            {appStatus === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}
