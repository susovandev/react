import { useState, type ReactNode } from 'react'
import { ThemeContext } from './themeContext'

const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<string>('light')

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
export default ThemeContextProvider
