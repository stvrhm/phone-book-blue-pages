import type { PaletteMode } from '@mui/material'
import { blue, red, grey } from '@mui/material/colors'

const theme = {
	palette: {
		primary: {
			main: blue['A700'],
		},
		secondary: {
			main: red['A400'],
		},
		divider: blue,
		text: {
			primary: grey[900],
			secondary: grey[800],
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
					...theme,
			  }
			: {
					// palette values for dark mode
					...themeDark,
			  }),
	},
})

export { theme, themeDark, getDesignTokens }
