import {setAppError} from "./app-slice";

export const errorMiddleware = store => next => action => {
    if (action.type.endsWith('/rejected')) {
        // Обработка ошибки
        store.dispatch(setAppError({error: action.error.message}))

        // Показ уведомления через библиотеку toast:
        // toast.error('Произошла ошибка: ' + action.error.message)
    }

    // Передача действия дальше
    return next(action)
}
