import {EditableSpan} from '@/common/components'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import {useAppDispatch} from '@/common/hooks'
import s from './TodolistTitle.module.css'
import {changeTodolistTitleTC, deleteTodolistTC, DomainTodolist} from '@/features/todolists/model/todolists-slice';

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({ todolist }: Props) => {
    const { id, title, entityStatus } = todolist

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
            <IconButton disabled={entityStatus === 'loading'} onClick={deleteTodolist}>
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
