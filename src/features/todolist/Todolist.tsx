import {Button} from "../button/Button";
import {ChangeEvent} from 'react';
import {FullInput} from '../fullInput/FullInput';
import {getFilteredTasks} from '../../common/common';
import {TodolistType} from '../../App';
import '../../App.css'
import {EditableSpan} from '../editableSpan/EditableSpan';


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
    changeTodolistTitle: (todoId: string , title: string) => void
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
    const changeTitleTodolistHandler = (title: string) => {
        changeTodolistTitle(todoId, title)
    }

    return (
        <div>
            <div className='container'>
                <h3>
                    <EditableSpan value={title} changeTitle={changeTitleTodolistHandler}/>
                </h3>
                <Button title='x' onClick={deleteTodolistHandler}/>
            </div>
            <div>
                <FullInput onClick={addTaskHandler}/>
            </div>
            <ul>
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

                        return <li key={task.id}>
                            <input type="checkbox" onChange={changeTaskStatusHandler} checked={task.isDone}/>
                            <EditableSpan className={task.isDone ? 'is-done' : ''} value={task.title} changeTitle={changeTaskTitleHandler}/>
                            {/*<span className={task.isDone ? 'is-done' : ''}>{task.title}</span>*/}
                            <Button title='x' onClick={removeTaskHandler}/>
                        </li>

                    })
                }
            </ul>
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''} onClick={() => changeTaskFilterHandler('all')} title='All'/>
                <Button className={filter === 'active' ? 'active-filter' : ''} onClick={() => changeTaskFilterHandler('active')
                } title='Active'/>
                <Button className={filter === 'completed' ? 'active-filter' : ''} onClick={() => changeTaskFilterHandler('completed')
                } title='Completed'/>
            </div>
            <div>
                <Button title='Remove all tasks' onClick={() => removeAllTask(todoId)}/>
            </div>
            <div>
                <span>{date}</span>
                <hr/>
                <span>{time}</span>
            </div>
        </div>
    )
}
