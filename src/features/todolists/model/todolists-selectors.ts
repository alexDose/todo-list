import type { RootState } from '@/app/store'
import { Todolist } from '@/features/todolists/model/todolists-slice'

export const selectTodolists = (state: RootState): Todolist[] => state.todolists
