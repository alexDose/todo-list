import {createTodolistTC, deleteTodolistTC} from './todolists-slice'
import {createAppSlice} from '@/common/utils';
import {tasksApi} from '@/features/todolists/api/tasksApi';
import {DomainTask, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types';
import {RootState} from '@/app/store';
import {changeAppStatus} from '@/app/app-slice';

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
                    await tasksApi.updateTask({todolistId, taskId, model})
                    return {todolistId, taskId, model}

                } catch (error) {
                    return thunkAPI.rejectWithValue(null)
                }
            },
            {
                fulfilled: (state, action) => {
                    const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
                    if (task) {
                        Object.assign(task, action.payload.model)
                    }
                }
            }
        ),
        createTaskTC: create.asyncThunk(
            async (payload: { todolistId: string, title: string }, thunkAPI) => {
                try {
                    thunkAPI.dispatch(changeAppStatus({status: 'loading'}))
                    const res = await tasksApi.createTask(payload)
                    thunkAPI.dispatch(changeAppStatus({status: 'success'}))
                    return {task: res.data.data.item}
                } catch (error) {
                    thunkAPI.dispatch(changeAppStatus({status: 'failed'}))
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
                    await tasksApi.deleteTask(payload)
                    return payload
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
        // changeTaskStatusTC: create.asyncThunk(
        //     async (payload: { todolistId: string; taskId: string, status: TaskStatus }, thunkAPI) => {
        //         const {todolistId, taskId, status} = payload
        //         const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
        //         const task = allTodolistTasks.find(task => task.id === taskId)
        //
        //         if (!task) {
        //             return thunkAPI.rejectWithValue(null)
        //         }
        //
        //         const model: UpdateTaskModel = {
        //             description: task.description,
        //             title: task.title,
        //             priority: task.priority,
        //             startDate: task.startDate,
        //             deadline: task.deadline,
        //             status,
        //         }
        //
        //         try {
        //             thunkAPI.dispatch(changeAppStatus({status: 'loading'}))
        //             await tasksApi.updateTask({todolistId, taskId, model})
        //             thunkAPI.dispatch(changeAppStatus({status: 'success'}))
        //             return {todolistId, taskId, status}
        //         } catch (error) {
        //             thunkAPI.dispatch(changeAppStatus({status: 'failed'}))
        //             return thunkAPI.rejectWithValue(null)
        //         }
        //     },
        //     {
        //         fulfilled: (state, action) => {
        //             const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        //             if (task) {
        //                 task.status = action.payload.status
        //             }
        //         },
        //     }
        // ),
        // changeTaskTitleTC: create.asyncThunk(
        //     async (payload: { todolistId: string; taskId: string; title: string }, thunkAPI) => {
        //         const {todolistId, taskId, title} = payload
        //         const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
        //         const task = allTodolistTasks.find(task => task.id === taskId)
        //
        //         if (!task) {
        //             return thunkAPI.rejectWithValue(null)
        //         }
        //
        //         const model: UpdateTaskModel = {
        //             description: task.description,
        //             title,
        //             priority: task.priority,
        //             startDate: task.startDate,
        //             deadline: task.deadline,
        //             status: task.status
        //         }
        //         try {
        //             thunkAPI.dispatch(changeAppStatus({status: 'loading'}))
        //             await tasksApi.changeTaskTitle({taskId: task.id, todolistId: task.todoListId, model})
        //             thunkAPI.dispatch(changeAppStatus({status: 'success'}))
        //             return {todolistId, taskId, title}
        //         } catch (error) {
        //             thunkAPI.dispatch(changeAppStatus({status: 'failed'}))
        //             return thunkAPI.rejectWithValue(null)
        //         }
        //     },
        //     {
        //         fulfilled: (state, action) => {
        //             const task = state[action.payload.todolistId].find((task) => task.id === action.payload.taskId)
        //             if (task) {
        //                 task.title = action.payload.title
        //             }
        //         },
        //     }
        // ),
        deleteAllTasksAC: create.reducer<{ todoId: string }>((state, action) => {
            state[action.payload.todoId] = []
        }),
    }),
    extraReducers: builder => {
        builder
            .addCase(createTodolistTC.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = []
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
    // changeTaskStatusTC,
    // changeTaskTitleTC
} = tasksSlice.actions

export const tasksReducer = tasksSlice.reducer
export const {selectTasks} = tasksSlice.selectors
