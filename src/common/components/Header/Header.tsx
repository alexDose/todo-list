import MenuIcon from '@mui/icons-material/Menu'
import { NavButton } from '@/common/components'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'
import { useAppSelector } from '@/common/hooks'
import { getTheme } from '@/common/theme'
import {changeThemeModeAC, selectThemeMode} from '@/app/app-slice'
import { useAppDispatch } from '@/common/hooks'
import { containerSx } from '@/common/styles'
import { Clock } from '@/common/components/Clock/Clock'

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    const changeThemeModeApp = () => {
        dispatch(changeThemeModeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return (
        <AppBar position="static" sx={{ mb: '30px' }}>
            <Toolbar>
                <Container maxWidth={'lg'} sx={containerSx}>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <NavButton>Sign in</NavButton>
                        <NavButton>Sign up</NavButton>
                        <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                        <Switch color={'default'} onChange={changeThemeModeApp} />
                        <Clock />
                    </div>
                </Container>
            </Toolbar>
        </AppBar>
    )
}
