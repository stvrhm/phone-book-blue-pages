import type { PaletteMode } from '@mui/material'
import { blue, grey, amber } from '@mui/material/colors'

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
			default: '#fff',
			paper: grey['50'],
		},
		paper: {},
	},
}

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

const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					...theme.palette,
			  }
			: {
					// palette values for dark mode
					...themeDark.palette,
			  }),
	},
})

export { theme, themeDark, getDesignTokens }
