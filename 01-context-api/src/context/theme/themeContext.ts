import { createContext, useContext } from 'react'

interface IThemeContextShape {
    theme: string
    toggleTheme: () => void
}
export const ThemeContext = createContext<IThemeContextShape>({
    theme: 'light',
    toggleTheme: () => {},
})

export const useTheme = () => {
    return useContext(ThemeContext)
}
