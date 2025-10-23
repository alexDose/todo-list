import {Task} from '@/features/todolists/model/tasks-reducer';
import {FilterValues} from '@/features/todolists/model/todolists-reducer';

export const getFilteredTasks = (tasks: Task[], filter: FilterValues) => {
    let filteredTasks = tasks
    switch (filter) {
        case 'active':
            return filteredTasks = tasks.filter(task => !task.isDone)
        case 'completed':
            return filteredTasks = tasks.filter(task => task.isDone)

        default:
            return filteredTasks
    }
}
