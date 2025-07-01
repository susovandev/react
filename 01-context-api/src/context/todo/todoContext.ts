import { createContext, useContext } from 'react'

export interface ITodoShape {
    owner: string
    id: string
    todo: string
    completed: boolean
    createdAt: string
}

export interface ITodoContextShape {
    todos: ITodoShape[]
    addTodo: (todo: ITodoShape) => void
    updateTodo: (id: string, todo: ITodoShape) => void
    deleteTodo: (id: string) => void
    completeTodo: (id: string) => void
}

const TodoContext = createContext<ITodoContextShape>({
    todos: [],
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
    completeTodo: () => {},
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export default TodoContext
