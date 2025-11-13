import { type CSSProperties, useEffect, useState } from 'react'
import Checkbox from '@mui/material/Checkbox'
import { CreateItemForm, EditableSpan } from '@/common/components'
import { Todolist } from '@/features/todolists/api/todolistsApi.types'
import { _todolistsApi } from '@/features/todolists/api/_todolistsApi'
import { ChangeEvent } from 'react/index'
import { tasksApi } from '@/features/todolists/api/_tasksApi'
import { DomainTask, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { TaskStatus } from '@/common/enum'

export const AppHttpRequests = () => {
    const [todolists, setTodolists] = useState<Todolist[]>([])
    const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

    useEffect(() => {
        _todolistsApi.getTodolists().then((res) => {
            const todolists = res.data
            setTodolists(todolists)
            todolists.map((todolist) => {
                tasksApi.getTasks(todolist.id).then((res) => {
                    setTasks((prevTasksState) => ({ [todolist.id]: res.data.items, ...prevTasksState }))
                })
            })
        })
    }, [])

    const createTodolist = (title: string) => {
        _todolistsApi.createTodolist(title).then((res) => {
            setTodolists([res.data.data.item, ...todolists])
            setTasks({ ...tasks, [res.data.data.item.id]: [] })
        })
    }

    const deleteTodolist = (id: string) => {
        _todolistsApi.deleteTodolist(id).then((res) => {
            if (res.data.resultCode === 0) {
                setTodolists(todolists.filter((todolist) => todolist.id !== id))
                delete tasks[id]
                setTasks({ ...tasks })
            } else {
                throw new Error('Error for delete')
            }
        })
    }

    const changeTodolistTitle = (id: string, title: string) => {
        _todolistsApi.changeTodolistTitle({ id, title }).then((res) => {
            if (res.data.resultCode === 0) {
                setTodolists(todolists.map((todolist) => (todolist.id === id ? { ...todolist, title } : todolist)))
            } else {
                throw new Error('Error for put')
            }
        })
    }

    const createTask = (todolistId: string, title: string) => {
        tasksApi.createTask({ todolistId, title }).then((res) => {
            setTasks({ ...tasks, [todolistId]: [res.data.data.item, ...tasks[todolistId]] })
        })
    }

    const deleteTask = (todolistId: string, taskId: string) => {
        tasksApi.deleteTask({ todolistId, taskId }).then(() => {
            setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((task) => task.id !== taskId) })
        })
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
        const todolistId = task.todoListId

        const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
        }

        tasksApi.updateTask({ todolistId, taskId: task.id, model }).then(() => {
            setTasks({
                ...tasks,
                [todolistId]: tasks[todolistId].map((t) => (t.id === task.id ? { ...t, ...model } : t)),
            })
        })
    }

    const changeTaskTitle = (task: DomainTask, title: string) => {
        const model: UpdateTaskModel = {
            description: task.description,
            title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
        }
        tasksApi.updateTask({ taskId: task.id, todolistId: task.todoListId, model }).then(() => {
            setTasks({
                ...tasks,
                [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t)),
            })
        })
    }

    return (
        <div style={{ margin: '20px' }}>
            <CreateItemForm addItem={createTodolist} />
            {todolists.map((todolist: Todolist) => (
                <div key={todolist.id} style={container}>
                    <div>
                        <EditableSpan
                            value={todolist.title}
                            onChange={(title) => changeTodolistTitle(todolist.id, title)}
                        />
                        <button onClick={() => deleteTodolist(todolist.id)}>x</button>
                    </div>
                    <CreateItemForm addItem={(title) => createTask(todolist.id, title)} />
                    {tasks[todolist.id]?.map((task: any) => (
                        <div key={task.id}>
                            <Checkbox
                                checked={task.status === TaskStatus.Completed}
                                onChange={(e) => changeTaskStatus(e, task)}
                            />
                            <EditableSpan value={task.title} onChange={(title) => changeTaskTitle(task, title)} />
                            <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

const container: CSSProperties = {
    border: '1px solid black',
    margin: '20px 0',
    padding: '10px',
    width: '300px',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
}
