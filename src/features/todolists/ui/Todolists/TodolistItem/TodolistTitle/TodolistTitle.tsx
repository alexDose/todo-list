import {EditableSpan} from '@/common/components'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import s from './TodolistTitle.module.css'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice';
import {useRemoveTodolistMutation, useUpdateTodolistTitleMutation} from '@/features/todolists/api/todolistsApi';

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist

    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

    const changeTodolistTitle = (title: string) => {
        updateTodolistTitle({id, title})
    }
    const deleteTodolist = () => {
        removeTodolist(id)
    }

    return (
        <div className={s.container}>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
            </h3>
            <IconButton disabled={entityStatus === 'loading'} onClick={deleteTodolist}>
                <DeleteIcon/>
            </IconButton>
        </div>
    )
}
