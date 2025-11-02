import {LoginInputs} from '@/features/auth/lib/schemas';
import {instance} from '@/common/instance';
import {BaseResponseType} from '@/common/types';

export const authApi = {
    login(payload: LoginInputs) {
        return instance.post<BaseResponseType<{ userId: number; token: string }>>('auth/login', payload)
    },
}
