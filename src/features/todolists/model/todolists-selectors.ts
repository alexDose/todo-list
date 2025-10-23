import type {RootState} from '@/app/store'
import {Todolist} from '@/features/todolists/model/todolists-reducer';

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
