import React from 'react'

import { App } from '@app'
import { Provider } from 'react-redux'

import store from '@services/store'
import ReactDOM from 'react-dom/client'

import './index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
