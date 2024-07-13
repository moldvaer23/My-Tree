import { MainPage } from '@pages/index'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter(
	[
		{
			index: true,
			element: <MainPage />,
		},
	],
	{ basename: '/' }
)
