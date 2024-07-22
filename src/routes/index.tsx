import Store from '../pages/store'
import Sale from '../pages/sale'
import Index from '../pages'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Index />
	},
	{
		path: 'sale',
		element: <Sale />
	},
	{
		path: 'store',
		element: <Store />
	}
])

export default router
