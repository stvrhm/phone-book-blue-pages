import { cssBundleHref } from '@remix-run/css-bundle'
import type { LinksFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'

import fontStylesheetUrl from './styles/fonts.css'
import { ThemeProvider } from '@emotion/react'
import { useThemeContext } from './mui/theme-provider'

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: fontStylesheetUrl },
	...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
]

function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}

export default function AppWithProviders() {
	const { theme } = useThemeContext()

	return (
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	)
}
