import { useEffect, useState, type ReactNode } from 'react'
import TodoContext, { type ITodoShape } from './todoContext'
import { nanoid } from 'nanoid'
type TTodoContextProviderProps = {
    children: ReactNode
}
const TodoContextProvider = ({ children }: TTodoContextProviderProps) => {
    const [todos, setTodos] = useState<ITodoShape[]>(() => {
        const localTodos = localStorage.getItem('todos')
        return localTodos
            ? JSON.parse(localTodos)
            : [
                  {
                      id: nanoid(),
                      owner: 'susovan',
                      todo: 'React + TypeScript + Vite',
                      createdAt: Date.now().toString(),
                      completed: false,
                  },
                  {
                      id: nanoid(),
                      owner: 'dipa',
                      todo: 'Node + Express + MongoDB',
                      createdAt: Date.now().toString(),
                      completed: false,
                  },
              ]
    })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
        console.log('[localStorage updated]', todos)
    }, [todos])

    // Create a new todo
    const addTodo = (todo: ITodoShape) => {
        setTodos((prevTodos) => [...prevTodos, { ...todo }])
    }

    // Update a todo by id
    const updateTodo = (id: string, todo: ITodoShape) => {
        setTodos((prevTodos) => prevTodos.map((t) => (t.id === id ? todo : t)))
    }

    // Delete a todo by id
    const deleteTodo = (id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
    }

    // is todo completed ?
    const completeTodo = (id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        )
    }
    return (
        <TodoContext.Provider
            value={{ todos, addTodo, updateTodo, deleteTodo, completeTodo }}
        >
            {children}
        </TodoContext.Provider>
    )
}
export default TodoContextProvider
