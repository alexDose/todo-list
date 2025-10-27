import { CreateItemForm } from '@/common/components'
import { Todolist } from '@/features/todolists/model/todolists-slice'
import { useAppDispatch } from '@/common/hooks'
import { createTaskAC } from '@/features/todolists/model/tasks-slice'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle'
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks'
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons'

type Props = {
    todolist: Todolist
}

export const TodolistItem = (props: Props) => {
    const { todolist } = props

    const dispatch = useAppDispatch()

    const createTask = (title: string) => {
        dispatch(createTaskAC({ todolistId: todolist.id, title }))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <CreateItemForm onCreateItem={createTask} />
            <Tasks todolist={todolist} />
            <FilterButtons todolist={todolist} />
        </div>
    )
}
