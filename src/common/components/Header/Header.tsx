import {containerSx} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.styles';
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from '@/common/components/NavButton/NavButton';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Switch from '@mui/material/Switch'
import {useAppSelector} from '@/common/hooks/useAppSelector';
import {selectThemeMode} from '@/app/app-selectors';
import {getTheme} from '@/common/theme/theme';
import {changeThemeModeAC} from '@/app/app-reducer';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';

export const Header = () => {
    const themeMode = useAppSelector(selectThemeMode)

    const theme = getTheme(themeMode)

    const dispatch = useAppDispatch()

    const changeThemeModeApp = () => {
        dispatch(changeThemeModeAC(themeMode === 'light' ? 'dark' : 'light'))
    }

    return <AppBar position="static" sx={{mb: '30px'}}>
        <Toolbar>
            <Container maxWidth={'lg'} sx={containerSx}>
                <IconButton color="inherit">
                    <MenuIcon/>
                </IconButton>
                <div>
                    <NavButton>Sign in</NavButton>
                    <NavButton>Sign up</NavButton>
                    <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
                    <Switch color={'default'} onChange={changeThemeModeApp}/>
                </div>
            </Container>
        </Toolbar>
    </AppBar>

}
