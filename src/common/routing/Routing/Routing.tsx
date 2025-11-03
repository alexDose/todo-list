import {Main} from "@/app/Main"
import {Navigate, Route, Routes} from "react-router"
import {Login} from '@/features/auth/ui/Login';
import {Error404, ProtectedRoute} from '@/common/components';
import {useAppSelector} from '@/common/hooks';
import {selectIsLoggedIn} from '@/features/auth/model/auth-slice';

export const PATH = {
    MAIN: '/',
    LOGIN: '/login',
    ERROR404: '/error404',
    FAQ: '/faq'
}

export const Routing = () => {
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    return (
        <Routes>
            <Route element={<ProtectedRoute isAllowed={isLoggedIn} redirectPath={PATH.LOGIN}/>}>
                <Route path={PATH.MAIN} element={<Main/>}/>
                <Route path={PATH.FAQ} element={<h2>FAQ</h2>}/>
            </Route>
            <Route element={<ProtectedRoute isAllowed={!isLoggedIn} redirectPath={PATH.MAIN}/>}>
                <Route path={PATH.LOGIN} element={<Login/>}/>
            </Route>
            <Route path={PATH.ERROR404} element={<Error404/>}/>
            <Route path='/*' element={<Navigate to={PATH.ERROR404}/>}/>
        </Routes>
    )
}
