import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit'
import {Todolist} from '@/features/todolists/api/todolistsApi.types';
import {todolistsApi} from '@/features/todolists/api/todolistsApi';

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistsSlice = createSlice({
        name: 'todolists',
        initialState: [] as DomainTodolist[],
        selectors: {
            selectTodolists: (state: Todolist[]) => state
        },
        reducers: create => ({
            deleteTodolistAC: create.reducer<{ id: string }>((state, action) => {
                const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
                const todolist = state.find((todolist) => todolist.id === action.payload.id)
                if (todolist) {
                    todolist.filter = action.payload.filter
                }
            }),
            createTodolistAC: create.preparedReducer(
                (title: string) => {
                    const id = nanoid()
                    return {payload: {id, title}}
                },
                (state, action) => {
                    state.unshift({...action.payload, filter: 'all', addedDate: '', order: 0})
                },
            )
        }),
        extraReducers: builder => {
            builder
                .addCase(fetchTodolistsTC.fulfilled, (state, action) => {
                    return action.payload.todolists.map(tl => {
                        return {...tl, filter: 'all'}
                    })
                })
                .addCase(fetchTodolistsTC.rejected, (state, action) => {
                    // обработка ошибки при запросе за тудулистами
                })
                .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
                    const index = state.findIndex(todolist => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state[index].title = action.payload.title
                    }
                })
                .addCase(createTodolistTC.fulfilled, (state, action) => {
                    state.unshift(action.payload)
                })
                .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                    console.log(action)
                    const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                    if (index !== -1) {
                        state.splice(index, 1)
                    }
                })
        },
    }
)

export const fetchTodolistsTC = createAsyncThunk(
    `${todolistsSlice.name}/fetchTodolistsTC`,
    async (_, thunkAPI) => {
        try {
            const res = await todolistsApi.getTodolists()
            return {todolists: res.data}
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const changeTodolistTitleTC = createAsyncThunk(
    `${todolistsSlice.name}/changeTodolistTitleTC`,
    async (payload: { id: string; title: string }, thunkAPI) => {
        try {
            await todolistsApi.changeTodolistTitle(payload)
            return payload
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const createTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/createTodolistTC`,
    async (title: string, thunkAPI) => {
        try {
            const res = await todolistsApi.createTodolist(title)
            return res.data.data.item
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const deleteTodolistTC = createAsyncThunk(
    `${todolistsSlice.name}/deleteTodolistTC`,
    async (id: string, thunkAPI) => {
        try {
            await todolistsApi.deleteTodolist(id)
            return {id}
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const {
    deleteTodolistAC,
    changeTodolistFilterAC,
    createTodolistAC
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors

