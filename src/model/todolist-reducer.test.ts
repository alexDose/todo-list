import {v1} from 'uuid'
import { expect, test, beforeEach } from 'vitest'
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    createTodolistAC,
    deleteTodolistAC,
    todolistReducer
} from './todolist-reducer'
import {TodolistType} from '../App';

export const newTodolistId = v1()
let todolistId1: string
let todolistId2: string
let startState: TodolistType[] = []

beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    startState = [
        { todoId: todolistId1, title: 'What to learn', filter: 'all' },
        { todoId: todolistId2, title: 'What to buy', filter: 'all' },
    ]
})

test('correct todolist should be deleted', () => {
    const endState = todolistReducer(startState, deleteTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].todoId).toBe(todolistId2)
})

test('correct todolist should be created', () => {
    const title = 'New todolist'
    const endState = todolistReducer(startState, createTodolistAC(newTodolistId, title))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(title)
})

test('correct todolist should change its title', () => {
    const title = 'New title'
    const endState = todolistReducer(startState, changeTodolistTitleAC({todoId: todolistId2, title}))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(title)
})

test('correct todolist should change its filter', () => {
    const filter = 'completed'
    const endState = todolistReducer(startState, changeTodolistFilterAC({todoId: todolistId2, filter}))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(filter)
})
