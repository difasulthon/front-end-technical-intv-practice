import { createBrowserRouter } from 'react-router'
import type { LoaderFunction } from 'react-router'

import App from '../App'
import Carousel from '../pages/carousel'
import Pagination from '../pages/pagination'
import FakeApi from '../pages/fakeApi'

import {loader as paginationLoader} from '../pages/pagination'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Carousel /> },
      { path: 'carousel', element: <Carousel /> },
      { 
        path: 'pagination/:page', 
        element: <Pagination />,
        loader: paginationLoader satisfies LoaderFunction,
      },
      { path: 'fake-api', element: <FakeApi /> },
    ]
  }
])