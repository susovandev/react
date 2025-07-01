import { nanoid } from 'nanoid'
import { useState } from 'react'
import { useTodo, type ITodoShape } from '../context/todo/todoContext'
import { toast } from 'react-toastify'

const TodoForm = () => {
    const [todo, setTodo] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const { addTodo } = useTodo()

    const todoSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!todo || !ownerName) {
            return toast.error('Please enter todo and owner name')
        }

        const newTodo: ITodoShape = {
            id: nanoid(),
            owner: ownerName,
            todo: todo,
            createdAt: Date.now().toString(),
            completed: false,
        }
        addTodo(newTodo)
        toast.success(`${ownerName}'s todo added successfully`)
        setTodo('')
        setOwnerName('')
    }

    return (
        <form
            onSubmit={todoSubmitHandler}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-3"
        >
            <input
                type="text"
                placeholder="Write your todo..."
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="text"
                placeholder="Owner name..."
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
                Add Todo
            </button>
        </form>
    )
}

export default TodoForm
