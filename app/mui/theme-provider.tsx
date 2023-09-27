import type { Theme } from '@mui/material'
import { createTheme } from '@mui/material'
import type { FC, PropsWithChildren } from 'react'
import { createContext, useContext } from 'react'
import { useTheme } from './use-theme'

type ThemeContextType = {
	mode: string
	toggleColorMode: () => void
	theme: Theme
}

export const ThemeContext = createContext<ThemeContextType>({
	mode: 'light',
	toggleColorMode: () => {},
	theme: createTheme(),
})

export const ThemeContextProvider: FC<PropsWithChildren> = ({ children }) => {
	const value = useTheme()
	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useThemeContext = () => {
	return useContext(ThemeContext)
}
