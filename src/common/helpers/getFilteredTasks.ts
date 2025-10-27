import { Task } from '@/features/todolists/model/tasks-slice'
import { FilterValues } from '@/features/todolists/model/todolists-slice'

export const getFilteredTasks = (tasks: Task[], filter: FilterValues) => {
    let filteredTasks = tasks
    switch (filter) {
        case 'active':
            return (filteredTasks = tasks.filter((task) => !task.isDone))
        case 'completed':
            return (filteredTasks = tasks.filter((task) => task.isDone))

        default:
            return filteredTasks
    }
}
