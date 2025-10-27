import { EditableSpan } from '@/common/components'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { changeTodolistTitleAC, deleteTodolistAC, Todolist } from '@/features/todolists/model/todolists-slice'
import { useAppDispatch } from '@/common/hooks'
import s from './TodolistTitle.module.css'

type Props = {
    todolist: Todolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { id, title } = todolist

    const dispatch = useAppDispatch()

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC({ id, title }))
    }
    const deleteTodolist = () => {
        dispatch(deleteTodolistAC({ id }))
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
