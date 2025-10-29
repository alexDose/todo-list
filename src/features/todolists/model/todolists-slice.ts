import {Todolist} from '@/features/todolists/api/todolistsApi.types';
import {todolistsApi} from '@/features/todolists/api/todolistsApi';
import {createAppSlice} from '@/common/utils';
import {changeAppStatus} from '@/app/app-slice';

export type DomainTodolist = Todolist & {
    filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistsSlice = createAppSlice({
        name: 'todolists',
        initialState: [] as DomainTodolist[],
        selectors: {
            selectTodolists: (state: DomainTodolist[]) => state
        },
        reducers: create => ({
            fetchTodolistsTC: create.asyncThunk(
                async (_, thunkAPI) => {
                    try {
                        thunkAPI.dispatch(changeAppStatus({status: 'loading'}))
                        const res = await todolistsApi.getTodolists()
                        thunkAPI.dispatch(changeAppStatus({status: 'success'}))
                        return {todolists: res.data}
                    } catch (error) {
                        thunkAPI.dispatch(changeAppStatus({status: 'failed'}))
                        return thunkAPI.rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        action.payload?.todolists.forEach(tl => {
                            state.push({...tl, filter: 'all'})
                        })
                    },
                }
            ),
            deleteTodolistTC: create.asyncThunk(
                async (id: string, thunkAPI) => {
                    try {
                        await todolistsApi.deleteTodolist(id)
                        return {id}
                    } catch (error) {
                        return thunkAPI.rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const index = state.findIndex((todolist) => todolist.id === action.payload.id)
                        if (index !== -1) {
                            state.splice(index, 1)
                        }
                    }
                }
            ),
            createTodolistTC: create.asyncThunk(
                async (title: string, thunkAPI) => {
                    try {
                        const res = await todolistsApi.createTodolist(title)
                        return res.data.data.item
                    } catch (error) {
                        return thunkAPI.rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.unshift({...action.payload, filter: 'all'})
                    }
                }
            ),
            changeTodolistTitleTC: create.asyncThunk(
                async (payload: { id: string; title: string }, thunkAPI) => {
                    try {
                        await todolistsApi.changeTodolistTitle(payload)
                        return payload
                    } catch (error) {
                        return thunkAPI.rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        const index = state.findIndex(todolist => todolist.id === action.payload.id)
                        if (index !== -1) {
                            state[index].title = action.payload.title
                        }
                    }
                }
            ),
            changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues}>((state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].filter = action.payload.filter
                }
            }),

        }),
    }
)

export const {
    fetchTodolistsTC,
    deleteTodolistTC,
    createTodolistTC,
    changeTodolistTitleTC,
    changeTodolistFilterAC
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors

