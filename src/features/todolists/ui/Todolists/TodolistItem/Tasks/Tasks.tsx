import List from '@mui/material/List'
import {TaskItem} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice'
import {useGetTasksQuery} from '@/features/todolists/api/tasksApi'
import {getFilteredTasks} from '@/common/helpers'
import {TasksSkeleton} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TasksSkeleton/TasksSkeleton';

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
    const { id, filter } = todolist
    const { data: tasks, isLoading } = useGetTasksQuery(id)

    const filteredTasks = getFilteredTasks(tasks?.items, filter)


    if (isLoading) {
        return <TasksSkeleton/>
    }

    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Tasks are empty</p>
            ) : (
                <List>
                    {filteredTasks?.map((task) => (
                        <TaskItem key={task.id} task={task} todolist={todolist} />
                    ))}
                </List>
            )}
        </>
    )
}
