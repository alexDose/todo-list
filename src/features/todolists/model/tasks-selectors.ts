import type { RootState } from '@/app/store'
import { TasksState } from '@/features/todolists/model/tasks-slice'

export const selectTasks = (state: RootState): TasksState => state.tasks
