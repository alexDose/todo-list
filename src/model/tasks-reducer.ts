import {TasksType} from '../app/App';
import {CreateTodolistAction, DeleteTodolistAction} from './todolist-reducer';
import {v1} from 'uuid';

export type TasksActionsType = CreateTodolistAction | DeleteTodolistAction | DeleteTaskAction | CreateTaskAction | ChangeTaskStatusAction | ChangeTaskTitleAction | DeleteAllTasksAction

type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
type CreateTaskAction = ReturnType<typeof createTaskAC>
type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>
type DeleteAllTasksAction = ReturnType<typeof deleteAllTasksAC>

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType): TasksType => {
    switch (action.type) {
        case 'create_todolist':
            return {...state, [action.payload.todolistId]: []}
        case 'delete_todolist':
            delete state[action.payload.id]
            return {...state}
        case 'delete_task':
            return {...state, [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)}
        case 'create_task':
            return {...state,
                [action.payload.todoId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todoId]]
            }
        case 'change_task_status':
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone} : task)}
        case 'change_task_title':
            return {...state, [action.payload.todoId]: state[action.payload.todoId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title} : task)}
        case 'delete_all_tasks':
            return {...state, [action.payload.todoId]: []}
        default:
            return state
    }
}

export const deleteTaskAC = (params: {todoId: string, taskId: string}) => {
    const {todoId, taskId} = params
    return {type: 'delete_task', payload: {todoId, taskId}} as const
}
export const createTaskAC = (params: {todoId: string, title: string}) => {
    const {todoId, title} = params
    return {type: 'create_task', payload: {todoId, title}} as const
}
export const changeTaskStatusAC = (params: {todoId: string, taskId: string, isDone: boolean}) => {
    const {todoId, taskId, isDone} = params
    return {type: 'change_task_status', payload: {todoId, taskId, isDone}} as const
}
export const changeTaskTitleAC = (params: {todoId: string, taskId: string, title: string}) => {
    const {todoId, taskId, title} = params
    return {type: 'change_task_title', payload: {todoId, taskId, title}} as const
}
export const deleteAllTasksAC = (todoId: string) => {
    return {type: 'delete_all_tasks', payload: {todoId}} as const
}
