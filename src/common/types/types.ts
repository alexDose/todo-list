export type BaseResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
