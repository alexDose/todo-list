import { ButtonMUI } from '@/common/components'
import Box from '@mui/material/Box'
// import { deleteAllTasksAC } from '@/features/todolists/model/tasks-slice'
import { FilterValues } from '@/features/todolists/model/todolists-slice'
import { useAppDispatch } from '@/common/hooks'
import { Todolist } from '@/features/todolists/api/todolistsApi.types'
import { todolistsApi } from '@/features/todolists/api/todolistsApi'

type Props = {
    todolist: Todolist
}

export const FilterButtons = ({ todolist }: Props) => {
    const { id, filter } = todolist
    const dispatch = useAppDispatch()

    // const deleteAllTask = () => {
    //     dispatch(deleteAllTasksAC({ todoId: id }))
    // }
    const changeFilter = (filter: FilterValues) => {
        dispatch(
            todolistsApi.util.updateQueryData(
                // название эндпоинта, в котором нужно обновить кэш
                'getTodolists',
                // аргументы для эндпоинта
                undefined,
                // `updateRecipe` - коллбэк для обновления закэшированного стейта мутабельным образом
                (state) => {
                    const todolist = state.find((todolist) => todolist.id === id)
                    if (todolist) {
                        todolist.filter = filter
                    }
                },
            ),
        )
    }

    const onAllClickHandler = () => changeFilter('all')
    const onActiveClickHandler = () => changeFilter('active')
    const onCompletedClickHandler = () => changeFilter('completed')

    return (
        <>
            <Box sx={{ display: 'flex', gap: '5px' }}>
                <ButtonMUI onClick={onAllClickHandler} title="All" filter={filter} />
                <ButtonMUI onClick={onActiveClickHandler} title="Active" filter={filter} />
                <ButtonMUI onClick={onCompletedClickHandler} title="Completed" filter={filter} />
                {/*<ButtonMUI onClick={deleteAllTask} title="Delete all tasks" />*/}
            </Box>
        </>
    )
}
