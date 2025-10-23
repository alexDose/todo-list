import {getListItemsSx} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.styles';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Checkbox from '@mui/material/Checkbox'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import {changeTaskStatusAC, changeTaskTitleAC, deleteTaskAC, Task} from '@/features/todolists/model/tasks-reducer';
import {ChangeEvent} from 'react/index';
import {useAppDispatch} from '@/common/hooks/useAppDispatch';
import {ListItem} from '@mui/material';
import {getListItemSx} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles';

type Props = {
    task: Task
    todolistId: string
}
export const TaskItem = ({task, todolistId}: Props) => {
    const {id, title, isDone} = task

    const dispatch = useAppDispatch()

    const deleteTask = () => {
        dispatch(deleteTaskAC({todolistId, taskId: id}))
    }
    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC({
            todolistId,
            taskId: id,
            isDone: e.currentTarget.checked
        }))
    }
    const changeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC({todolistId, taskId: id, title}))
    }

    return <ListItem key={task.id} sx={getListItemSx}>
        <Box sx={getListItemsSx(isDone)}>
            <Checkbox checked={isDone} onChange={changeTaskStatus}/>
            <EditableSpan value={title} onChange={changeTaskTitle}/>
        </Box>
        <IconButton onClick={deleteTask}>
            <DeleteOutlineIcon/>
        </IconButton>
    </ListItem>
}
