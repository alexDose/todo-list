import { EditableSpan } from '@/common/components'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import { ChangeEvent } from 'react/index'
import { ListItem } from '@mui/material'
import {
    getListItemsSx,
    getListItemSx,
} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles'
import { DomainTask } from '@/features/todolists/api/tasksApi.types'
import { TaskStatus } from '@/common/enum'
import { useState } from 'react'
import { useDeleteTaskMutation, useUpdateTaskMutation } from '@/features/todolists/api/tasksApi'
import { getModelForTask } from '@/common/helpers'

type Props = {
    task: DomainTask
}
export const TaskItem = ({ task }: Props) => {
    const { id, title, todoListId } = task
    const isTaskCompleted = task.status === TaskStatus.Completed
    const [isDisabled, setDisabled] = useState(false)

    const [deleteTask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const removeTask = () => {
        setDisabled(true)
        deleteTask({ todolistId: todoListId, taskId: id })
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        const model = getModelForTask(task, { status: e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New })
        updateTask({ todolistId: todoListId, taskId: id, model })
    }

    const changeTaskTitle = (title: string) => {
        const model = getModelForTask(task, { title })
        updateTask({ todolistId: todoListId, taskId: id, model })
    }

    return (
        <ListItem key={task.id} sx={getListItemSx}>
            <Box sx={getListItemsSx(isTaskCompleted)}>
                <Checkbox disabled={isDisabled} checked={isTaskCompleted} onChange={changeTaskStatus} />
                <EditableSpan disabled={isDisabled} value={title} onChange={changeTaskTitle} />
            </Box>
            <IconButton disabled={isDisabled} onClick={removeTask}>
                <DeleteOutlineIcon />
            </IconButton>
        </ListItem>
    )
}
