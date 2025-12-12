import { Outlet } from 'react-router'

import { ThemeProvider } from './theme/ThemeProvider'
import Navbar from './components/navbar'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="theme">
      <div className='main-container'>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </div>
    </ThemeProvider>
  )
}