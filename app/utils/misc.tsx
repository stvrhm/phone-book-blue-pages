export function slow(time: number) {
	return function (x: any) {
		return new Promise(resolve => setTimeout(() => resolve(x), time))
	}
}

export function getInitials(name: string) {
	const names = name.split(' ')
	let initials = names[0].substring(0, 1).toUpperCase()

	if (names.length > 1) {
		initials += names[names.length - 1].substring(0, 1).toUpperCase()
	}
	return initials
}