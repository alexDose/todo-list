import {LoginInputs} from '@/features/auth/lib/schemas';
import {instance} from '@/common/instance';
import {BaseResponseType} from '@/common/types';

export const authApi = {
    login(payload: LoginInputs) {
        return instance.post<BaseResponseType<{ userId: number; token: string }>>('auth/login', payload)
    },
    logout() {
        return instance.delete<BaseResponseType>('auth/login')
    },
    me() {
        return instance.get<BaseResponseType<{ id: number, email: string, login: string }>>('auth/me')
    },
}
