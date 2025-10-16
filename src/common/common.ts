import {FilterValue, TaskType} from '../features/todolist/Todolist';

export const getFilteredTasks = (tasks: TaskType[], filter: FilterValue) => {
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

export function normalizedNumbersForDate(num) {
    if (num < 10) {
        return `0${num}`
    }
    return `${num}`
}
