import {FilterValue, TaskType, Todolist} from "./features/todolist/Todolist";
import './App.css'
import {useState} from "react";
import {v1} from 'uuid';
import {normalizedNumbersForDate} from './common/common';
import {FullInput} from './features/fullInput/FullInput';
import {SearchAppBar} from './features/appBar/SearchAppBar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type TodolistType = {
    todoId: string
    title: string
    filter: FilterValue
}
type TasksType = {
    [key: string]: TaskType[]
}

export const App = () => {
    const [newDate] = useState(new Date())
    const date = `${normalizedNumbersForDate(newDate.getDate())}.${normalizedNumbersForDate(newDate.getMonth())}.${newDate.getFullYear()}`
    const timeCreate = `${normalizedNumbersForDate(newDate.getHours())}:${normalizedNumbersForDate(newDate.getMinutes())}`

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {todoId: todolistId1, title: 'What to learn', filter: 'all'},
        {todoId: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })


    const removeTask = (todoId: string, taskId: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].filter(task => task.id !== taskId)})
    }
    const removeAllTask = (todoId: string) => {
        setTasks({...tasks, [todoId]: []})
    }
    const createTask = (todoId: string, title: string) => {
        setTasks({...tasks, [todoId]: [{id: v1(), title, isDone: false}, ...tasks[todoId]],})
    }
    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeTaskFilter = (todoId: string, filter: FilterValue) => {
        setTodolists(todolists.map(todo => todo.todoId === todoId ? {...todo, filter} : todo))
    }
    const deleteTodolist = (todoId: string) => {
        setTodolists(todolists.filter(todo => todo.todoId !== todoId))
        delete tasks[todoId]
        setTasks({...tasks})
    }
    const createTodolist = (title: string) => {
        let todoId = v1()
        setTodolists([{todoId, title, filter: 'all'}, ...todolists])
        setTasks({...tasks, [todoId]: []})
    }
    const changeTitleTodolist = (todoId: string, title: string) => {
        setTodolists(todolists.map(todo => todo.todoId === todoId ? {...todo, title} : todo))
    }
    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        setTasks({...tasks, [todoId]: tasks[todoId].map(t => t.id === taskId ? {...t, title} : t)})
    }

    return (
        <div className="app">
            <SearchAppBar/>
            <Container sx={{p: '30px'}} maxWidth={'lg'}>
                <Grid container>
                    <FullInput onClick={createTodolist}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(todolist => <Paper key={todolist.todoId}
                                                      sx={{m: '30px 0', p: '20px'}}>
                        <Grid>
                            <Todolist changeTaskTitle={changeTaskTitle}
                                      changeTodolistTitle={changeTitleTodolist}
                                      deleteTodolist={deleteTodolist}
                                      changeTaskFilter={changeTaskFilter}
                                      todolist={todolist}
                                      title={todolist.title}
                                      tasks={tasks[todolist.todoId]}
                                      date={date}
                                      time={timeCreate}
                                      removeTask={removeTask}
                                      removeAllTask={removeAllTask}
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
