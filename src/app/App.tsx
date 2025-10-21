import {FilterValue, TaskType, Todolist} from "../features/todolist/Todolist";
import './App.css'
import {useState} from "react";
import {v1} from 'uuid';
import {normalizedNumbersForDate} from '../common/common';
import {FullInput} from '../features/fullInput/FullInput';
import {SearchAppBar} from '../features/appBar/SearchAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC
} from '../model/todolist-reducer';
import {
    changeTaskStatusAC,
    changeTaskTitleAC,
    createTaskAC,
    deleteAllTasksAC,
    deleteTaskAC
} from '../model/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from './store';

export type TodolistType = {
    todoId: string
    title: string
    filter: FilterValue
}
export type TasksType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const [newDate] = useState(new Date())
    const date = `${normalizedNumbersForDate(newDate.getDate())}.${normalizedNumbersForDate(newDate.getMonth())}.${newDate.getFullYear()}`
    const timeCreate = `${normalizedNumbersForDate(newDate.getHours())}:${normalizedNumbersForDate(newDate.getMinutes())}`
    //
    // const todolistId1 = v1()
    // const todolistId2 = v1()
    //
    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksType>(state => state.tasks)

    const dispatch = useDispatch()
    // const [todolists, dispatchTodolist] = useReducer(todolistReducer, [])
    // const [todolists, setTodolists] = useState<TodolistType[]>([
    //     {todoId: todolistId1, title: 'What to learn', filter: 'all'},
    //     {todoId: todolistId2, title: 'What to buy', filter: 'all'},
    // ])
    // const [tasks, dispatchTasks] = useReducer(tasksReducer, {})

    // const [tasks, setTasks] = useState<TasksType>({
    //     [todolistId1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: 'Rest API', isDone: true},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    // })
    //

    const deleteTask = (todoId: string, taskId: string) => {
        dispatch(deleteTaskAC({todoId, taskId}))
    }
    const deleteAllTask = (todoId: string) => {
        dispatch(deleteAllTasksAC(todoId))
    }
    const createTask = (todoId: string, title: string) => {
        dispatch(createTaskAC({todoId, title}))
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC({todoId, taskId, isDone}))
    }
    const changeTodolistFilter = (todoId: string, filter: FilterValue) => {
        dispatch(changeTodolistFilterAC({todoId, filter}))
    }
    const deleteTodolist = (todoId: string) => {
        dispatch(deleteTodolistAC(todoId))
    }
    const createTodolist = (title: string) => {
        const todolistId = v1()
        dispatch(createTodolistAC(todolistId, title))
    }
    const changeTodolistTitle = (todoId: string, title: string) => {
        dispatch(changeTodolistTitleAC({todoId, title}))
    }
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({todoId, taskId, title}))
    }

    return (
        <div className="app">
            <SearchAppBar/>
            <Container sx={{p: '30px'}} maxWidth={'lg'}>
                <Grid container>
                    <FullInput onClick={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {
                        !todolists ? <div>hui</div>
                        :
                        todolists.map(todolist => <Paper key={todolist.todoId}
                                                      sx={{m: '30px 0', p: '20px'}}>
                        <Grid>
                            <Todolist changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTodolistTitle}
                                      deleteTodolist={deleteTodolist}
                                      changeTaskFilter={changeTodolistFilter}
                                      todolist={todolist}
                                      tasks={tasks}
                                      date={date}
                                      time={timeCreate}
                                      removeTask={deleteTask}
                                      removeAllTask={deleteAllTask}
                                      addTask={createTask}
                                      changeTaskStatus={changeTaskStatus}/>
                        </Grid>
                    </Paper>)
                    }
                </Grid>
            </Container>
        </div>
    )
}
