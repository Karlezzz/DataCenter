import Index from './pages'
import { RouterProvider } from 'react-router-dom'
import routes from './routes'
import React from 'react'
const App: React.FC = () => {
	return <RouterProvider router={routes}>{<Index />}</RouterProvider>
}

export default App
