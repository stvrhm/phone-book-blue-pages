import type { Theme } from '@mui/material'
import { createTheme } from '@mui/material'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import { useTheme } from './use-theme'

/**
 * Defines the structure of the ThemeContext, including the current mode, toggle function, and theme.
 */
type ThemeContextType = {
	mode: string
	toggleColorMode: () => void
	theme: Theme
}

/**
 * Context for managing the theme of your application.
 * Provides access to the current theme mode, a function to toggle the color mode, and the theme object itself.
 */
export const ThemeContext = createContext<ThemeContextType>({
	mode: 'light',
	toggleColorMode: () => {},
	theme: createTheme(),
})

/**
 * A provider component that wraps the application and provides access to the theme context.
 *
 * @param children - The children components that will have access to the theme context.
 */
export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const value = useTheme() // You might need to implement the 'useTheme' function
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * A custom hook for consuming the theme context within any components.
 *
 * @returns The current theme context, including mode, toggle function, and theme.
 */
export const useThemeContext = () => {
	return useContext(ThemeContext)
}
