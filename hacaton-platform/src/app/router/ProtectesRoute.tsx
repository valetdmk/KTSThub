import  { Navigate } from 'react-router-dom'
import { authStore } from '../../entities/auth.store'

interface Props {
    children: React.ReactNode
    roles?: string[]
}

export const ProtectedRoute = ({ children, roles }: Props) => {
    const user = authStore.getUser()

    if (!user) {
        return <Navigate to='/' />
    }

    if (roles && !roles.includes(user.role)) {
        return <Navigate to='/' />
    }

    return <>{children}</>
}