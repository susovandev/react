import { useState } from 'react'
import { useTodo } from '../../context/todo/todoContext'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from 'recharts'

const Dashboard = () => {
    const { todos } = useTodo()
    const users = Array.from(new Set(todos.map((todo) => todo.owner)))
    const [selectedUser, setSelectedUser] = useState<string | null>(null)

    const todosByUser = users.map((user) => {
        const userTodos = todos.filter((todo) => todo.owner === user)
        const completed = userTodos.filter((todo) => todo.completed).length
        return {
            user,
            todos: userTodos,
            total: userTodos.length,
            completed,
            percent: Math.round((completed / userTodos.length) * 100) || 0,
        }
    })

    const totalTodos = todos.length
    const completedTodos = todos.filter((t) => t.completed).length

    const selectedUserTodos = todosByUser.find((u) => u.user === selectedUser)

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">📊 Dashboard</h2>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h4 className="text-lg font-semibold">Total Todos</h4>
                    <p className="text-2xl">{totalTodos}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h4 className="text-lg font-semibold">Completed</h4>
                    <p className="text-2xl text-green-500">{completedTodos}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                    <h4 className="text-lg font-semibold">Completion Rate</h4>
                    <p className="text-2xl">
                        {totalTodos > 0
                            ? Math.round((completedTodos / totalTodos) * 100)
                            : 0}
                        %
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-8">
                <h4 className="text-lg font-semibold mb-4">
                    User Completion Chart
                </h4>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={todosByUser}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="user" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="percent" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white dark:bg-gray-800 p-4 rounded shadow">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-200 dark:bg-gray-700">
                            <th className="text-left py-2 px-4">User</th>
                            <th className="text-left py-2 px-4">Total</th>
                            <th className="text-left py-2 px-4">Completed</th>
                            <th className="text-left py-2 px-4">Progress</th>
                            <th className="text-left py-2 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todosByUser.map(
                            ({ user, total, completed, percent }) => (
                                <tr
                                    key={user}
                                    className="border-t border-gray-300 dark:border-gray-600"
                                >
                                    <td className="py-2 px-4 text-gray-600">
                                        {user}
                                    </td>
                                    <td className="py-2 px-4">{total}</td>
                                    <td className="py-2 px-4 text-green-500">
                                        {completed}
                                    </td>
                                    <td className="py-2 px-4 w-1/2">
                                        <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="bg-blue-600 h-full rounded-full transition-all"
                                                style={{ width: `${percent}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm mt-1">
                                            {percent}%
                                        </p>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="text-sm text-blue-600 hover:underline"
                                            onClick={() =>
                                                setSelectedUser(user)
                                            }
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedUser && selectedUserTodos && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold">
                                {selectedUser}'s Todos
                            </h3>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => setSelectedUser(null)}
                            >
                                ❌
                            </button>
                        </div>
                        <ul className="space-y-2 max-h-60 overflow-y-auto">
                            {selectedUserTodos.todos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded"
                                >
                                    <span
                                        className={
                                            todo.completed
                                                ? 'line-through text-green-500'
                                                : 'text-gray-800 dark:text-gray-200'
                                        }
                                    >
                                        {todo.todo}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dashboard
