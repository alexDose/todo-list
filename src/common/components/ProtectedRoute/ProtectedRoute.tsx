import { Navigate, Outlet } from 'react-router'
import { ReactNode } from 'react'

type PropsType = {
    children?: ReactNode
    isAllowed: boolean
    redirectPath?: string
}

export const ProtectedRoute = ({ children, isAllowed, redirectPath }: PropsType) => {
    if (!isAllowed) {
        return <Navigate to={redirectPath} />
    }
    return children ? children : <Outlet />
}
