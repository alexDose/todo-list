import {createTodolistTC, deleteTodolistTC} from './todolists-slice'
import {createAppSlice} from '@/common/utils';
import {tasksApi} from '@/features/todolists/api/tasksApi';
import {DomainTask, domainTaskSchema, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types';
import {RootState} from '@/app/store';
import {changeAppStatus, setAppError} from '@/app/app-slice';
import {ResultCode} from '@/common/enum';
import {handleServerAppError} from '@/common/utils/handleServerAppError';
import {handleServerNetworkError} from '@/common/utils/handleServerNetworkError';

export type TasksState = Record<string, DomainTask[]>

export const tasksSlice = createAppSlice({
    name: 'tasks',
    initialState: {} as TasksState,
    selectors: {
        selectTasks: (state: TasksState) => state
    },
    reducers: create => ({
        fetchTasksTC: create.asyncThunk(
            async (todolistId: string, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatus({status: 'loading'}))
                    const res = await tasksApi.getTasks(todolistId)
                    domainTaskSchema.array().parse(res.data.items)
                    thunkAPI.dispatch(changeAppStatus({status: 'success'}))
                    return {todolistId, tasks: res.data.items}
                } catch (error) {
                    thunkAPI.dispatch(changeAppStatus({status: 'failed'}))
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    state[action.payload.todolistId] = action.payload.tasks
                }
            }
        ),
        updateTaskTC: create.asyncThunk(
            async (payload: { todolistId: string; taskId: string; domainModel: Partial<UpdateTaskModel> }, thunkAPI) => {
                const {todolistId, taskId, domainModel} = payload
                const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
                const task = allTodolistTasks.find(task => task.id === taskId)

                if (!task) {
                    return thunkAPI.rejectWithValue(null)
                }

                const model: UpdateTaskModel = {
                    description: task.description,
                    title: task.title,
                    priority: task.priority,
                    startDate: task.startDate,
                    deadline: task.deadline,
                    status: task.status,
                    ...domainModel
                }

                try {
                    const res = await tasksApi.updateTask({todolistId, taskId, model})
                    if (res.data.resultCode === ResultCode.Success) {
                        return {task: res.data.data.item}
                    } else {
                        handleServerAppError(res.data.data.item, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }
                } catch (error) {
                    handleServerNetworkError(error, thunkAPI.dispatch)
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    console.log(action)

                    const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
                    if (task) {
                        Object.assign(task, action.payload.task)
                    }
                }
            }
        ),
        createTaskTC: create.asyncThunk(
            async (payload: { todolistId: string, title: string }, thunkAPI) => {
                try {
                    const res = await tasksApi.createTask(payload)
                    if (res.data.resultCode === ResultCode.Success) {
                        return {task: res.data.data.item}
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
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }
            }
        ),
        deleteTaskTC: create.asyncThunk(
            async (payload: { todolistId: string, taskId: string }, thunkAPI) => {
                try {
                    const res = await tasksApi.deleteTask(payload)
                    if (res.data.resultCode === ResultCode.Success) {
                        return payload
                    } else {
                        handleServerAppError(res.data, thunkAPI.dispatch)
                        return thunkAPI.rejectWithValue(null)
                    }

                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const tasks = state[action.payload.todolistId]
                    const index = tasks.findIndex((task) => task.id === action.payload.taskId)
                    if (index !== -1) {
                        tasks.splice(index, 1)
                    }
                }
            }
        ),
        deleteAllTasksAC: create.reducer<{ todoId: string }>((state, action) => {
            state[action.payload.todoId] = []
        }),
    }),
    extraReducers: builder => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.id] = []
            })
            .addCase(deleteTodolistTC.fulfilled, (state, action) => {
                delete state[action.payload.id]
            })
    },
})

export const {
    updateTaskTC,
    createTaskTC,
    fetchTasksTC,
    deleteTaskTC,
    deleteAllTasksAC,
} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors
