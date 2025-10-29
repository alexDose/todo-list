import {FilterValues} from '@/features/todolists/model/todolists-slice'
import {DomainTask} from '@/features/todolists/api/tasksApi.types';
import {TaskStatus} from '@/common/enum';

export const getFilteredTasks = (tasks: DomainTask[], filter: FilterValues) => {
    let filteredTasks = tasks
    switch (filter) {
        case 'active':
            return (filteredTasks = tasks.filter((task) => task.status === TaskStatus.New))
        case 'completed':
            return (filteredTasks = tasks.filter((task) => task.status === TaskStatus.Completed))

        default:
            return filteredTasks
    }
}
