import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@services/router'

export const App: FC = () => <RouterProvider router={router} />
