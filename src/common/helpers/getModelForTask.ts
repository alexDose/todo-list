import {DomainTask, UpdateTaskModel} from '@/features/todolists/api/tasksApi.types';

export const getModelForTask = (task: DomainTask, domainModel: Partial<UpdateTaskModel>) => {
    const model: UpdateTaskModel = {
        description: task.description,
        title: task.title,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...domainModel
    }
    return model
}
