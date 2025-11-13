import { baseApi } from '@/app/baseApi'
import { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { BaseResponseType } from '@/common/types'

export const tasksApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<GetTasksResponse, string>({
            query: (todolistId) => `todo-lists/${todolistId}/tasks`,
            providesTags: ['Task'],
        }),
        createTask: build.mutation<BaseResponseType<{ item: DomainTask }>, { todolistId: string; title: string }>({
            query: ({ todolistId, title }) => ({
                url: `todo-lists/${todolistId}/tasks`,
                method: 'POST',
                body: { title },
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: build.mutation<BaseResponseType, { todolistId: string; taskId: string }>({
            query: ({ todolistId, taskId }) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task'],
        }),
        updateTask: build.mutation<BaseResponseType, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
            query: ({ todolistId, taskId, model }) => ({
                url: `todo-lists/${todolistId}/tasks/${taskId}`,
                method: 'PUT',
                body: model,
            }),
            invalidatesTags: ['Task'],
        }),
    }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
