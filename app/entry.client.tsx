/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
import * as React from 'react'
import { RemixBrowser } from '@remix-run/react'
import { startTransition, StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import createEmotionCache, { defaultCache } from './mui/createEmotionCache'
import ClientStyleContext from './mui/ClientStyleContext'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeContextProvider } from './mui/theme-provider'

interface ClientCacheProviderProps {
	children: React.ReactNode
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
	const [cache, setCache] = React.useState(defaultCache)

	function reset() {
		setCache(createEmotionCache())
	}

	return (
		<ClientStyleContext.Provider value={{ reset }}>
			<CacheProvider value={cache}>{children}</CacheProvider>
		</ClientStyleContext.Provider>
	)
}

const hydrate = () => {
	startTransition(() => {
		hydrateRoot(
			document,
			<StrictMode>
				<ClientCacheProvider>
					<ThemeContextProvider>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<RemixBrowser />
					</ThemeContextProvider>
				</ClientCacheProvider>
			</StrictMode>,
		)
	})
}

if (window.requestIdleCallback) {
	window.requestIdleCallback(hydrate)
} else {
	// Safari doesn't support requestIdleCallback
	// https://caniuse.com/requestidlecallback
	window.setTimeout(hydrate, 1)
}
