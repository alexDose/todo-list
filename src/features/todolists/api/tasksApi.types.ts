import {TaskPriority, TaskStatus} from '@/common/enum';
import { z } from 'zod/v4'

export const domainTaskSchema = z.object({
    description: z.string().nullable(),
    title: z.string(),
    status: z.nativeEnum(TaskStatus),
    priority: z.nativeEnum(TaskPriority),
    startDate: z.string().nullable(),
    deadline: z.string().nullable(),
    id: z.string(),
    todoListId: z.string(),
    order: z.int(),
    addedDate: z.iso.datetime({ local: true }),
})

export type UpdateTaskModel = {
    description: string | null
    title: string
    status: TaskStatus
    priority: TaskPriority
    startDate: string | null
    deadline: string | null
}

export type DomainTask = z.infer<typeof domainTaskSchema>

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: DomainTask[]
}

