import { createBrowserRouter } from 'react-router'

import App from '../App'
import Carousel from '../pages/carousel'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Carousel /> },
      { path: 'carousel', element: <Carousel /> }
    ]
  }
])