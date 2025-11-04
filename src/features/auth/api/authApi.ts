import {baseApi} from '@/app/baseApi';
import {BaseResponseType} from '@/common/types';
import {LoginInputs} from '@/features/auth/lib/schemas';

export const authApi = baseApi.injectEndpoints({
    endpoints: build => ({
        me: build.query<BaseResponseType<{ id: number; email: string; login: string }>, void>({
            query: () => 'auth/me',
        }),
        login: build.mutation<BaseResponseType<{ userId: number; token: string }>, LoginInputs>({
            query: body => ({
                url: 'auth/login',
                method: 'POST',
                body,
            }),
        }),
        logout: build.mutation<BaseResponseType, void>({
            query: () => ({
                url: 'auth/login',
                method: 'DELETE',
            }),
        }),
    }),
})

export const { useMeQuery, useLoginMutation, useLogoutMutation } = authApi
