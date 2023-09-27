import type { PaletteMode } from '@mui/material'
import { createTheme } from '@mui/material'
import React from 'react'
import { getDesignTokens } from './theme'

export const useTheme = () => {
	const [mode, setMode] = React.useState<PaletteMode>('light')

	const toggleColorMode = () =>
		setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'))

	const modifiedTheme = React.useMemo(
		() => createTheme(getDesignTokens(mode)),
		[mode],
	)

	return {
		theme: modifiedTheme,
		mode,
		toggleColorMode,
	}
}
