import {TodolistType} from '../App';
import {v1} from 'uuid';
import {FilterValue} from '../features/todolist/Todolist';

export type TodolistActionsType =
    DeleteTodolistAction
    | CreateTodolistAction
    | changeTodolistTitleAction
    | changeTodolistFilterAction

export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
export type changeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>

const initialState: TodolistType[] = []

export const todolistReducer = (state: TodolistType[] = initialState, action: TodolistActionsType): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist':
            return state.filter(todo => todo.todoId !== action.payload.id)
        case 'create_todolist':
            return [{todoId: action.payload.todolistId, title: action.payload.title, filter: 'all'}, ...state]
        case 'change_todolist_title':
            return state.map(todo => todo.todoId === action.payload.todoId ? {
                ...todo,
                title: action.payload.title
            } : todo)
        case 'change_todolist_filter':
            return state.map(todo => todo.todoId === action.payload.todoId ? {
                ...todo,
                filter: action.payload.filter
            } : todo)
        default:
            return state
    }
}
export const deleteTodolistAC = (id: string) => {
    return {type: 'delete_todolist', payload: {id}} as const
}
export const createTodolistAC = (todolistId: string, title: string) => {
    return {type: 'create_todolist', payload: {todolistId, title}} as const
}
export const changeTodolistTitleAC = (params: { todoId: string, title: string }) => {
    const {todoId, title} = params
    return {type: 'change_todolist_title', payload: {todoId, title}} as const
}
export const changeTodolistFilterAC = (params: { todoId: string, filter: FilterValue }) => {
    const {todoId, filter} = params
    return {type: 'change_todolist_filter', payload: {todoId, filter}} as const
}
