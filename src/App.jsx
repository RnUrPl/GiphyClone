import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import GifProvider from './context'

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router}/>
    </GifProvider>
  )
}

export default App
