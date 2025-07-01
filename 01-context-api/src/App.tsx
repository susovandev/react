import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import { useTodo } from './context/todo/todoContext'
import Dashboard from './components/dashboard/Dashboard'
import { useEffect, useState } from 'react'

const App = () => {
    const { todos } = useTodo()
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme === 'dark') {
            document.documentElement.classList.add('dark')
            setTheme('dark')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])

    const handleToggleTheme = () => {
        const html = document.documentElement
        if (theme === 'light') {
            html.classList.add('dark')
            setTheme('dark')
        } else {
            html.classList.remove('dark')
            setTheme('light')
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">📝 Todos</h2>
                <button
                    onClick={handleToggleTheme}
                    className="bg-gray-300 dark:bg-gray-700 px-4 py-2 rounded cursor-pointer"
                >
                    Toggle Mode
                </button>
            </div>

            <div className="max-w-md mx-auto mb-4">
                <TodoForm />
            </div>

            <div className="space-y-4 max-w-md mx-auto">
                {todos && todos.length > 0 ? (
                    todos.map((todo) => <TodoList key={todo.id} todo={todo} />)
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        No todos yet!
                    </p>
                )}
            </div>

            <Dashboard />
        </div>
    )
}

export default App
