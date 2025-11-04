import { instance } from '@/common/instance'
import { Todolist } from '@/features/todolists/api/todolistsApi.types'
import { BaseResponseType } from '@/common/types'

export const _todolistsApi = {
    getTodolists() {
        return instance.get<Todolist[]>('/todo-lists')
    },
    changeTodolistTitle(payload: { id: string; title: string }) {
        const { id, title } = payload
        return instance.put<BaseResponseType>(`/todo-lists/${id}`, { title })
    },
    deleteTodolist(id) {
        return instance.delete<BaseResponseType>(`/todo-lists/${id}`)
    },
    createTodolist(title) {
        return instance.post<BaseResponseType<{ item: Todolist }>>('/todo-lists', { title })
    },
}
