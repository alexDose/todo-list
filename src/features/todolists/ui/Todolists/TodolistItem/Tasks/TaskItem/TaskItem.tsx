import {EditableSpan} from '@/common/components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import {deleteTaskTC, updateTaskTC} from '@/features/todolists/model/tasks-slice'
import {ChangeEvent} from 'react/index'
import {useAppDispatch} from '@/common/hooks'
import {ListItem} from '@mui/material'
import {
    getListItemsSx,
    getListItemSx,
} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles'
import {DomainTask} from '@/features/todolists/api/tasksApi.types';
import {TaskStatus} from '@/common/enum';
import {useState} from 'react';

type Props = {
    task: DomainTask
    todolistId: string
}
export const TaskItem = ({ task, todolistId }: Props) => {
    const { id, title } = task
    const isTaskCompleted = task.status === TaskStatus.Completed
    const [isDisabled, setDisabled] = useState(false)

    const dispatch = useAppDispatch()

    const deleteTask = () => {
        setDisabled(true)
        dispatch(deleteTaskTC({ todolistId, taskId: id }))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(
            updateTaskTC({
                todolistId,
                taskId: id,
                domainModel: {status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New},
            }),
        )
    }
    const changeTaskTitle = (title: string) => {
        dispatch(updateTaskTC({ todolistId, taskId: id, domainModel: {title} }))
    }

    return (
        <ListItem key={task.id} sx={getListItemSx}>
            <Box sx={getListItemsSx(isTaskCompleted)}>
                <Checkbox checked={isTaskCompleted} onChange={changeTaskStatus} />
                <EditableSpan value={title} onChange={changeTaskTitle} />
            </Box>
            <IconButton disabled={isDisabled} onClick={deleteTask}>
                <DeleteOutlineIcon />
            </IconButton>
        </ListItem>
    )
}
