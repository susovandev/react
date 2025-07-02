import { useState } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { UserForm, UserInfoList, UserStatsChart } from './components/index'
import type { IUserStateShape } from './types'

const App = () => {
    const [editableUser, setEditableUser] = useState<IUserStateShape | null>(
        null
    )
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [theme, setTheme] = useState('light')

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark')
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    return (
        <div className="min-h-screen p-4 bg-white dark:bg-gray-900 text-black dark:text-white">
            <button
                onClick={toggleTheme}
                className="mb-4 px-4 py-2 rounded-full bg-blue-500 text-white dark:bg-yellow-500"
            >
                {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
            </button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UserForm
                    isEditable={isEditable}
                    editableUser={editableUser}
                    setIsEditable={setIsEditable}
                    setEditableUser={setEditableUser}
                />
                <UserStatsChart />
            </div>
            <UserInfoList
                isEditable={isEditable}
                setIsEditable={setIsEditable}
                editableUser={editableUser}
                setEditableUser={setEditableUser}
            />
        </div>
    )
}
export default App
