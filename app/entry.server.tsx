/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from 'node:stream'

import type { AppLoadContext, EntryContext } from '@remix-run/node'
import { createReadableStreamFromReadable } from '@remix-run/node'
import { RemixServer } from '@remix-run/react'
import isbot from 'isbot'
import { renderToPipeableStream, renderToString } from 'react-dom/server'
import createEmotionServer from '@emotion/server/create-instance'
import { CacheProvider as EmotionCacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import createEmotionCache from './mui/createEmotionCache'
import { ServerStyleContext } from './mui/ServerStyleContext'
import { ThemeContextProvider } from './mui/theme-provider'

const ABORT_DELAY = 5_000

export default function handleRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
	loadContext: AppLoadContext,
) {
	return isbot(request.headers.get('user-agent'))
		? handleBotRequest(
				request,
				responseStatusCode,
				responseHeaders,
				remixContext,
		  )
		: handleBrowserRequest(
				request,
				responseStatusCode,
				responseHeaders,
				remixContext,
		  )
}

function handleBotRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	return new Promise((resolve, reject) => {
		const { pipe, abort } = renderToPipeableStream(
			<RemixServer
				context={remixContext}
				url={request.url}
				abortDelay={ABORT_DELAY}
			/>,
			{
				onAllReady() {
					const body = new PassThrough()

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(createReadableStreamFromReadable(body), {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				onError(error: unknown) {
					responseStatusCode = 500
					console.error(error)
				},
			},
		)

		setTimeout(abort, ABORT_DELAY)
	})
}

function handleBrowserRequest(
	request: Request,
	responseStatusCode: number,
	responseHeaders: Headers,
	remixContext: EntryContext,
) {
	return new Promise((resolve, reject) => {
		const emotionCache = createEmotionCache()
		const { extractCriticalToChunks } = createEmotionServer(emotionCache)

		const html = renderToString(
			<ServerStyleContext.Provider value={null}>
				<EmotionCacheProvider value={emotionCache}>
					<ThemeContextProvider>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<RemixServer
							context={remixContext}
							url={request.url}
							abortDelay={ABORT_DELAY}
						/>
					</ThemeContextProvider>
				</EmotionCacheProvider>
			</ServerStyleContext.Provider>,
		)

		const chunks = extractCriticalToChunks(html)

		const { pipe, abort } = renderToPipeableStream(
			<ServerStyleContext.Provider value={chunks.styles}>
				<EmotionCacheProvider value={emotionCache}>
					<ThemeContextProvider>
						{/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
						<CssBaseline />
						<RemixServer
							context={remixContext}
							url={request.url}
							abortDelay={ABORT_DELAY}
						/>
					</ThemeContextProvider>
				</EmotionCacheProvider>
			</ServerStyleContext.Provider>,
			{
				onShellReady() {
					const body = new PassThrough()

					responseHeaders.set('Content-Type', 'text/html')

					resolve(
						new Response(createReadableStreamFromReadable(body), {
							headers: responseHeaders,
							status: responseStatusCode,
						}),
					)

					pipe(body)
				},
				onShellError(error: unknown) {
					reject(error)
				},
				onError(error: unknown) {
					console.error(error)
					responseStatusCode = 500
				},
			},
		)

		setTimeout(abort, ABORT_DELAY)
	})
}
