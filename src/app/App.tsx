import { router } from '@services/router'
import { FC } from 'react'
import { RouterProvider } from 'react-router-dom'

export const App: FC = () => <RouterProvider router={router} />
