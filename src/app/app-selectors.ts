import {RootState} from '@/app/store';
import {ThemeMode} from '@/app/app-slice';

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
