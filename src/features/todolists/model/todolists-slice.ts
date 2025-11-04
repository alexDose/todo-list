import {Todolist} from '@/features/todolists/api/todolistsApi.types';
import {_todolistsApi} from '@/features/todolists/api/_todolistsApi';
import {createAppSlice} from '@/common/utils';
import {setAppStatus} from '@/app/app-slice';
import {RequestStatus} from '@/common/types';
import {handleServerAppError} from '@/common/utils/handleServerAppError';
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError';
import {ResultCode} from '@/common/enum';
import {clearTodolistsAndTasks} from '@/common/actions';

export type DomainTodolist = Todolist & {
    filter: FilterValues
    entityStatus: RequestStatus
}

export type FilterValues = 'all' | 'active' | 'completed'

export const todolistsSlice = createAppSlice({
        name: 'todolists',
        initialState: [] as DomainTodolist[],
        selectors: {
            selectTodolists: (state: DomainTodolist[]) => state,
            selectStatusTodolist: state => state.entityStatus
        },
        reducers: create => ({
            fetchTodolistsTC: create.asyncThunk(
                async (_, thunkAPI) => {
                    try {
                        thunkAPI.dispatch(setAppStatus({status: 'loading'}))
                        const res = await _todolistsApi.getTodolists()
                        thunkAPI.dispatch(setAppStatus({status: 'success'}))
                        if (res.data) {
                            return {todolists: res.data}
                        } else {
                            handleServerAppError(res.data, thunkAPI.dispatch)
                            return thunkAPI.rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(error, thunkAPI.dispatch)
                        thunkAPI.dispatch(setAppStatus({status: 'failed'}))
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
                        thunkAPI.dispatch(changeTodolistStatusAC({id, entityStatus: 'loading'}))
                        const res = await _todolistsApi.deleteTodolist(id)
                        if (res.data.resultCode === ResultCode.Success) {
                            return {id}
                        } else {
                            handleServerAppError(res.data, thunkAPI.dispatch)
                            return thunkAPI.rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(error, thunkAPI.dispatch)
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
                        const res = await _todolistsApi.createTodolist(title)
                        if (res.data.resultCode === ResultCode.Success) {
                            return {todolist: res.data.data.item}
                        } else {
                            handleServerAppError(res.data, thunkAPI.dispatch)
                            return thunkAPI.rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(error, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                },
                {
                    fulfilled: (state, action) => {
                        state.unshift({...action.payload.todolist, filter: 'all'})
                    }
                }
            ),
            changeTodolistTitleTC: create.asyncThunk(
                async (payload: { id: string; title: string }, thunkAPI) => {
                    try {
                        const res = await _todolistsApi.changeTodolistTitle(payload)
                        if (res.data.resultCode === ResultCode.Success) {
                            return payload
                        } else {
                            handleServerAppError(res.data, thunkAPI.dispatch)
                            return thunkAPI.rejectWithValue(null)
                        }
                    } catch (error) {
                        handleServerNetworkError(error, thunkAPI.dispatch)
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
            changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValues }>((state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].filter = action.payload.filter
                }
            }),
            changeTodolistStatusAC: create.reducer<{ id: string, entityStatus: RequestStatus }>((state, action) => {
                const index = state.findIndex(todolist => todolist.id === action.payload.id)
                if (index !== -1) {
                    state[index].entityStatus = action.payload.entityStatus
                }
            }),
        }),
        extraReducers: builder => {
            builder
                .addCase(clearTodolistsAndTasks.type, (state, action) => {
                        return []
                    }
                )
        }
    }
)

export const {
    changeTodolistStatusAC,
    fetchTodolistsTC,
    deleteTodolistTC,
    createTodolistTC,
    changeTodolistTitleTC,
    changeTodolistFilterAC
} = todolistsSlice.actions

export const todolistsReducer = todolistsSlice.reducer
export const {selectTodolists, selectStatusTodolist} = todolistsSlice.selectors

