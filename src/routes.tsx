import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages/Home'
import { Pets } from './pages/Pets'
import { Admin } from './pages/Admin'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/pets',
    element: <Pets />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
])

export default router
