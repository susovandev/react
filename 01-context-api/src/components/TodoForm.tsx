import { nanoid } from 'nanoid'
import { useTodo, type ITodoShape } from '../context/todo/todoContext'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

interface IFormData {
    todo: string
    owner: string
}
const TodoForm: React.FC = () => {
    const { addTodo } = useTodo()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>()
    const todoSubmitHandler = (data: IFormData) => {
        const newTodo: ITodoShape = {
            id: nanoid(),
            owner: data.owner,
            todo: data.todo,
            createdAt: Date.now().toString(),
            completed: false,
        }
        addTodo(newTodo)
        toast.success(`${data?.owner}'s todo added successfully`)
    }

    console.log(errors)
    return (
        <form
            onSubmit={handleSubmit(todoSubmitHandler)}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md space-y-3"
        >
            <input
                placeholder="Write your todo..."
                {...register('todo', {
                    required: 'Todo is required',
                    minLength: {
                        value: 3,
                        message: 'Todo must be at least 3 characters',
                    },
                })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.todo && (
                <small className="text-red-500 dark:text-red-400 mb-0.5">
                    {errors?.todo?.message}
                </small>
            )}
            <input
                placeholder="Owner name..."
                {...register('owner', {
                    required: 'Owner name is required',
                    minLength: {
                        value: 3,
                        message: 'Owner name must be at least 3 characters',
                    },
                })}
                className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.owner && (
                <small className="text-red-500 dark:text-red-400 mb-0.5">
                    {errors?.owner?.message}
                </small>
            )}
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
