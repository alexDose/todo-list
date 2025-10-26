import { getFilteredTasks } from '@/common/helpers'
import { Todolist } from '@/features/todolists/model/todolists-reducer'
import { useAppSelector } from '@/common/hooks'
import { selectTasks } from '@/features/todolists/model/tasks-selectors'
import List from '@mui/material/List'
import { TaskItem } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem'

type Props = {
    todolist: Todolist
}

export const Tasks = ({ todolist }: Props) => {
    const { id, filter } = todolist
    const tasks = useAppSelector(selectTasks)

    return (
        <>
            {getFilteredTasks(tasks[id], filter).length === 0 ? (
                <p>Tasks are empty</p>
            ) : (
                <List>
                    {getFilteredTasks(tasks[id], filter).map((task) => {
                        return <TaskItem key={task.id} task={task} todolistId={id} />
                    })}
                </List>
            )}
        </>
    )
}
