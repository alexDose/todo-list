import {Main} from "@/app/Main"
import {Navigate, Route, Routes} from "react-router"
import {Login} from '@/features/auth/ui/Login/Login';
import {Error404} from '@/common/components';

const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    ERROR404: '/error404',
}

export const Routing = () => (
    <Routes>
        <Route path={PATH.MAIN} element={<Main/>}/>
        <Route path={PATH.LOGIN} element={<Login/>}/>
        <Route path={PATH.ERROR404} element={<Error404/>}/>
        <Route path='/*' element={<Navigate to={PATH.ERROR404}/>}/>
    </Routes>
)
