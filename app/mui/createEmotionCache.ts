import createCache from '@emotion/cache'

/**
 * Creates and configures an Emotion cache for styling.
 * The created cache is required for Material-UI (mui).
 *
 * @returns An Emotion cache instance configured with the key 'mui'.
 */
export default function createEmotionCache() {
	return createCache({ key: 'mui' })
}

// Default Emotion cache instance for immediate use.
export const defaultCache = createEmotionCache()
