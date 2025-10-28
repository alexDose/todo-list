import {EditableSpan} from '@/common/components'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import {useAppDispatch} from '@/common/hooks'
import s from './TodolistTitle.module.css'
import {changeTodolistTitleTC, deleteTodolistTC} from '@/features/todolists/model/todolists-slice';
import {Todolist} from '@/features/todolists/api/todolistsApi.types';

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { id, title } = todolist

    const dispatch = useAppDispatch()

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleTC({ id, title }))
    }
    const deleteTodolist = () => {
        dispatch(deleteTodolistTC( id ))
    }

    return (
        <div className={s.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle} />
            </h3>
            <IconButton onClick={deleteTodolist}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
