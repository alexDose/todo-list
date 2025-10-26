import {instance} from '@/common/instance';
import {DomainTask, GetTasksResponse, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types';
import {BaseResponseType} from '@/common/types';

export const tasksApi = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(payload: {todolistId: string, title: string}) {
        const {todolistId, title} = payload
        return instance.post<BaseResponseType<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(payload: {todolistId: string, taskId: string}) {
        const {todolistId, taskId} = payload
        return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(payload: {todolistId: string, taskId: string, model: UpdateTaskModel}) {
        const {todolistId, taskId, model} = payload
        return instance.put<BaseResponseType<{item: DomainTask}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {model})
    },
    changeTaskTitle(payload: {todolistId: string, taskId: string, model: UpdateTaskModel}) {
        const {todolistId, taskId, model} = payload
        return instance.put<Omit<BaseResponseType, 'fieldsErrors'>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {model})
    }
}
