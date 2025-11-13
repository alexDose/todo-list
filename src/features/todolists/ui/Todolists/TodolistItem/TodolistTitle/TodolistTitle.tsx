import {EditableSpan} from '@/common/components'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import s from './TodolistTitle.module.css'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice'
import {
    todolistsApi,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation
} from '@/features/todolists/api/todolistsApi'
import {RequestStatus} from '@/common/types';
import {useAppDispatch} from '@/common/hooks';

type Props = {
    todolist: DomainTodolist
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, title, entityStatus} = todolist

    const [removeTodolist] = useRemoveTodolistMutation()
    const [updateTodolistTitle] = useUpdateTodolistTitleMutation()

    const dispatch = useAppDispatch()

    const changeTodolistTitle = (title: string) => {
        updateTodolistTitle({id, title})
    }
    const changeTodolistStatus = (entityStatus: RequestStatus) => {
        dispatch(
            todolistsApi.util.updateQueryData(
                'getTodolists',
                undefined,
                state => {
                    const todolist = state.find(todolist => todolist.id === id)
                    if (todolist) {
                        todolist.entityStatus = entityStatus
                    }
                }
            )
        )
    }

    const deleteTodolist = async () => {
        try {
            changeTodolistStatus('loading')
            await removeTodolist(id).unwrap()
        } catch (e) {
            console.error('Failed', e)
        } finally {
            changeTodolistStatus('idle')
        }
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
