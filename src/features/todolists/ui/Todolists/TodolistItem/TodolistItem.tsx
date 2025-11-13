import { CreateItemForm } from '@/common/components'
import { TodolistTitle } from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle'
import { Tasks } from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks'
import { FilterButtons } from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons'
import { useCreateTaskMutation } from '@/features/todolists/api/tasksApi'
import {DomainTodolist} from '@/features/todolists/lib/types';

type Props = {
    todolist: DomainTodolist
}

export const TodolistItem = (props: Props) => {
    const { todolist } = props
    const [createTask] = useCreateTaskMutation()

    const addTask = (title: string) => {
        createTask({ todolistId: todolist.id, title })
    }

    return (
        <div>
            <TodolistTitle todolist={todolist} />
            <CreateItemForm addItem={addTask} disabled={todolist.entityStatus === 'loading'} />
            <Tasks todolist={todolist} />
            <FilterButtons todolist={todolist} />
        </div>
    )
}
