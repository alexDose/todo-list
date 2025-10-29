export type BaseResponseType<T = {}> = {
    resultCode: number
    fieldsErrors: string[]
    messages: string[]
    data: T
}
export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
