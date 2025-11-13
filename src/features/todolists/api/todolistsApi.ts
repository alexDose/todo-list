import { Todolist } from '@/features/todolists/api/todolistsApi.types'
import { DomainTodolist } from '@/features/todolists/model/todolists-slice'
import { BaseResponseType } from '@/common/types'
import { baseApi } from '@/app/baseApi'

export const todolistsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<DomainTodolist[], void>({
            query: () => 'todo-lists',
            transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
                todolists.map((todolist) => ({ ...todolist, filter: 'all', entityStatus: 'idle' })),
            providesTags: ['Todolist'],
        }),
        addTodolist: build.mutation<BaseResponseType<{ item: Todolist }>, string>({
            query: (title) => ({
                url: 'todo-lists',
                method: 'POST',
                body: { title },
            }),
            invalidatesTags: ['Todolist'],
        }),
        removeTodolist: build.mutation<BaseResponseType, string>({
            query: (id) => ({
                url: `todo-lists/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Todolist'],
        }),
        updateTodolistTitle: build.mutation<BaseResponseType, { id: string; title: string }>({
            query: ({ id, title }) => ({
                url: `todo-lists/${id}`,
                method: 'PUT',
                body: { title },
            }),
            invalidatesTags: ['Todolist'],
        }),
    }),
})

export const {
    useGetTodolistsQuery,
    useAddTodolistMutation,
    useRemoveTodolistMutation,
    useUpdateTodolistTitleMutation,
} = todolistsApi
