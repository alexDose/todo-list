import { getFilteredTasks } from '@/common/helpers'
import { useAppSelector } from '@/common/hooks'
import List from '@mui/material/List'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem'
import {Todolist} from '@/features/todolists/api/todolistsApi.types';
import {selectTasks} from '@/features/todolists/model/tasks-slice';

type Props = {
    todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {
    const { id, filter } = todolist
    const tasks = useAppSelector(selectTasks)

    return (
        <>
            {getFilteredTasks(tasks[id], filter)?.length === 0 ? (
                <p>Tasks are empty</p>
            ) : (
                <List>
                    {getFilteredTasks(tasks[id], filter)?.map((task) => {
                        return <TaskItem key={task.id} task={task} todolistId={id} />
                    })}
                </List>
            )}
        </>
    )
}
