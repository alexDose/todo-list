import {ChangeEvent} from 'react';
import {FullInput} from '../fullInput/FullInput';
import {getFilteredTasks} from '../../common/common';
import {TodolistType} from '../../App';
import '../../App.css'
import {EditableSpan} from '../editableSpan/EditableSpan';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export type FilterValue = 'all' | 'completed' | 'active'

type PropsType = {
    tasks: TaskType[]
    date: string
    time: string
    removeTask: (todoId: string, taskId: string) => void
    removeAllTask: (todoId: string) => void
    addTask: (todoId: string, title: string) => void
    changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
    todolist: TodolistType
    changeTaskFilter: (todoId: string, filter: FilterValue) => void
    deleteTodolist: (todoId: string) => void
    changeTodolistTitle: (todoId: string, title: string) => void
    changeTaskTitle: (todoId: string, taskId: string, title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const Todolist = ({
                             todolist: {todoId, title, filter},
                             tasks,
                             date,
                             time,
                             removeTask,
                             removeAllTask,
                             addTask,
                             changeTaskStatus,
                             changeTaskFilter,
                             deleteTodolist,
                             changeTodolistTitle,
                             changeTaskTitle
                         }: PropsType) => {

    const changeTaskFilterHandler = (filter: FilterValue) => {
        changeTaskFilter(todoId, filter)
    }
    const addTaskHandler = (title: string) => {
        addTask(todoId, title)
    }
    const deleteTodolistHandler = () => {
        deleteTodolist(todoId)
    }
    const deleteAllTaskHandler = () => {
        removeAllTask(todoId)
    }
    const changeTitleTodolistHandler = (title: string) => {
        changeTodolistTitle(todoId, title)
    }
    const onAllClickHandler = () => changeTaskFilterHandler('all')
    const onActiveClickHandler = () => changeTaskFilterHandler('active')
    const onCompletedClickHandler = () => changeTaskFilterHandler('completed')

    return (
        <div>
            <div className='container'>
                <h3>
                    <EditableSpan value={title} changeTitle={changeTitleTodolistHandler}/>
                </h3>
                <DeleteOutlinedIcon onClick={deleteTodolistHandler}/>
            </div>
            <div>
                <FullInput onClick={addTaskHandler}/>
            </div>
            <List>
                {(getFilteredTasks(tasks, filter).length == 0)
                    ? <div>tasks empty</div>
                    : getFilteredTasks(tasks, filter).map(task => {

                        const removeTaskHandler = () => removeTask(todoId, task.id)
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            changeTaskStatus(todoId, task.id, e.currentTarget.checked)
                        }
                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todoId, task.id, title)
                        }

                        return <ListItem key={task.id}>
                            <Checkbox checked={task.isDone}
                                      onChange={changeTaskStatusHandler}
                            />
                            <EditableSpan className={task.isDone ? 'is-done' : ''} value={task.title}
                                          changeTitle={changeTaskTitleHandler}/>
                            <DeleteOutlinedIcon onClick={removeTaskHandler}/>
                        </ListItem>
                    })
                }
            </List>
            <div>
                <Button size={'small'} variant={filter === 'all' ? 'contained' : 'outlined'} onClick={onAllClickHandler}>All</Button>
                <Button size={'small'} variant={filter === 'active' ? 'contained' : 'outlined'} onClick={onActiveClickHandler}>Active</Button>
                <Button size={'small'} variant={filter === 'completed' ? 'contained' : 'outlined'} onClick={onCompletedClickHandler}>Completed</Button>
            </div>
            <div>
                <Button size={'small'} variant={'outlined'} onClick={deleteAllTaskHandler}>Delete all tasks</Button>
            </div>
            <div>
                <span>{date}</span>
                <hr/>
                <span>{time}</span>
            </div>
        </div>
    )
}
