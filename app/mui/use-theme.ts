import type { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material'
import React from 'react'
import { getDesignTokens } from './theme'

/**
 * Custom hook for managing the application's theme mode and providing the corresponding theme object.
 *
 * @returns An object containing the current theme, theme mode, and a function to toggle the theme mode.
 */
export const useTheme = () => {
	const [mode, setMode] = React.useState<PaletteMode>('light')

	/**
	 * Function to toggle the application's theme mode between 'light' and 'dark'.
	 */
	const toggleColorMode = () =>
		setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))

	/**
	 * Memoized theme object based on the selected theme mode.
	 */
	const modifiedTheme = React.useMemo(
		() => createTheme(getDesignTokens(mode)),
		[mode],
	)

	return {
		theme: modifiedTheme, // The current theme object based on the selected mode.
		mode, // The current theme mode ('light' or 'dark').
		toggleColorMode, // Function to toggle between 'light' and 'dark' modes.
	}
}
