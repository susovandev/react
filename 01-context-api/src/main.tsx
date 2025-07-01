import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TodoContextProvider from './context/todo/TodoContextProvider.tsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')!).render(
    <>
        <ToastContainer position="top-right" />
        <TodoContextProvider>
            <App />
        </TodoContextProvider>
    </>
)
