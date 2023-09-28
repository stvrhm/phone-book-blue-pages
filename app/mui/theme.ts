import type { PaletteMode } from '@mui/material'
import { blue, grey, amber } from '@mui/material/colors'

const theme = {
	palette: {
		primary: {
			main: blue['A700'],
		},
		secondary: {
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
			default: amber['50'],
		},
	},
}

const themeDark = {
	palette: {
		// primary: {
		// 	main: blue['A700'],
		// },
		// secondary: {
		// 	main: red['A400'],
		// },
		// divider: blue,
		// text: {
		// 	primary: grey[900],
		// 	secondary: grey[800],
		// },
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
