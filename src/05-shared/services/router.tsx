import { MainPage } from '@pages/main-page'
import { SettingsPage } from '@pages/settings'
import { createBrowserRouter } from 'react-router-dom'

export const router = createBrowserRouter(
	[
		{
			index: true,
			element: <MainPage />,
		},
		{
			path: 'settings',
			element: <SettingsPage />,
		},
	],
	{ basename: '/' }
)
