/**
 * Returns a function that introduces a delay by resolving a promise after a specified time.
 *
 * @param time - The delay time in milliseconds.
 * @returns A function that, when called, returns a promise that resolves after the specified delay.
 */
export function slow(time: number) {
	return function (x: any) {
		return new Promise(resolve => setTimeout(() => resolve(x), time))
	}
}

/**
 * Extracts initials from a full name string.
 *
 * @param name - The full name from which initials are to be extracted.
 * @returns The initials, consisting of the first letters of the first and last names, capitalized.
 */
export function getInitials(name: string) {
	const names = name.split(' ')
	let initials = names[0].substring(0, 1).toUpperCase()

	if (names.length > 1) {
		initials += names[names.length - 1].substring(0, 1).toUpperCase()
	}
	return initials
}
