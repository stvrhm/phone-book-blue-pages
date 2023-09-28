import type { PaletteMode } from '@mui/material'
import { blue, grey, amber } from '@mui/material/colors'

/**
 * The base theme object with palette definitions for light mode.
 */
const theme = {
	palette: {
		primary: {
			light: blue['50'],
			main: blue['A700'],
		},
		secondary: {
			main: '#fff',
		},
		accent: {
			main: amber['500'],
		},
		border: {
			default: blue['A700'],
		},
		text: {
			primary: grey[900],
			secondary: grey[800],
		},
		background: {
			default: grey['50'],
			paper: '#fff',
		},
		paper: {},
	},
}

/**
 * The theme object specifically for dark mode, overriding some palette values.
 */
const themeDark = {
	palette: {
		primary: {
			main: blue['A100'],
		},
		secondary: {
			main: blue['A100'],
		},
		background: {
			default: grey['900'],
			paper: grey['900'],
		},
	},
}

/**
 * Function to retrieve design tokens (theme) based on the selected palette mode.
 *
 * @param mode - The palette mode, either 'light' or 'dark'.
 * @returns The design tokens (theme) for the selected mode.
 */
const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// Palette values for light mode
					...theme.palette,
			  }
			: {
					// Palette values for dark mode
					...themeDark.palette,
			  }),
	},
})

export { theme, themeDark, getDesignTokens }
