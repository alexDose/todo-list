import {getFilteredTasks} from '@/common/helpers'
import {useAppDispatch, useAppSelector} from '@/common/hooks'
import List from '@mui/material/List'
import {TaskItem} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem'
import {fetchTasksTC, selectTasks} from '@/features/todolists/model/tasks-slice';
import {useEffect} from 'react';
import {DomainTodolist} from '@/features/todolists/model/todolists-slice';

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({ todolist }: Props) => {
    const { id, filter, entityStatus } = todolist
    const tasks = useAppSelector(selectTasks)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [])

    return (
        <>
            {getFilteredTasks(tasks[id], filter)?.length === 0 ? (
                <p>Tasks are empty</p>
            ) : (
                <List>
                    {getFilteredTasks(tasks[id], filter)?.map((task) => {
                        return <TaskItem key={task.id}  task={task} todolistId={id} />
                    })}
                </List>
            )}
        </>
    )
}
