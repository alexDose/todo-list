import List from '@mui/material/List'
import {TaskItem} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem'
import {DomainTodolist} from '@/features/todolists/model/todolists-slice';
import {useGetTasksQuery} from '@/features/todolists/api/tasksApi';
import {getFilteredTasks} from '@/common/helpers';

type Props = {
    todolist: DomainTodolist
}

export const Tasks = ({todolist}: Props) => {
    const {id, filter} = todolist

    const {data: tasks} = useGetTasksQuery(id)
    const filteredTasks = getFilteredTasks(tasks?.items, filter)
    return (
        <>
            {filteredTasks?.length === 0 ? (
                <p>Tasks are empty</p>
            ) : (
                <List>
                    {filteredTasks?.map((task) => <TaskItem key={task.id} task={task} todolist={todolist}/>)}
                </List>
            )}
        </>
    )
}
