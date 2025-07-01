import { useState } from 'react'
import { useTodo, type ITodoShape } from '../context/todo/todoContext'
import { toast } from 'react-toastify'

const TodoList = ({ todo }: { todo: ITodoShape }) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [isTodoCompleted, setIsTodoCompleted] = useState(todo.completed)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const { updateTodo, deleteTodo } = useTodo()

    const editTodoHandler = (id: string) => {
        setIsTodoEditable((prev) => !prev)
        if (isTodoEditable) {
            updateTodo(id, {
                ...todo,
                todo: todoMsg,
                completed: isTodoCompleted,
            })
            toast.success('Todo updated successfully')
        }
    }

    return (
        <div className="flex items-center justify-between gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md">
            <input
                type="checkbox"
                checked={isTodoCompleted}
                onChange={(e) => {
                    const checked = e.currentTarget.checked
                    setIsTodoCompleted(checked)
                    updateTodo(todo.id, {
                        ...todo,
                        todo: todoMsg,
                        completed: checked,
                    })
                }}
                className="w-5 h-5 accent-blue-500"
            />
            <input
                type="text"
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                className={`flex-1 px-2 py-1 rounded-md border border-transparent bg-transparent focus:outline-none focus:border-blue-400 ${
                    isTodoCompleted ? 'line-through text-gray-400' : ''
                }`}
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">
                👤 {todo.owner}
            </span>

            <button
                disabled={isTodoCompleted}
                onClick={() => editTodoHandler(todo.id)}
                className="text-lg hover:text-blue-600 disabled:opacity-50"
                title={isTodoEditable ? 'Save' : 'Edit'}
            >
                {isTodoEditable ? '📂' : '📝'}
            </button>

            <button
                onClick={() => {
                    if (confirm('Are you sure you want to delete this todo?')) {
                        deleteTodo(todo.id)
                    }
                }}
                className="text-lg hover:text-red-600"
                title="Delete"
            >
                ❌
            </button>
        </div>
    )
}

export default TodoList
