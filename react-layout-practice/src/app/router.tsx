import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectesRoute'

import Home from '../pages/Home/Home'
import AdminPage from '../pages/Admin/AdminPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },

  {
    path: '/admin',
    element: (
      <ProtectedRoute roles={['admin']}>
        <AdminPage />
      </ProtectedRoute>
    ),
  },
])
