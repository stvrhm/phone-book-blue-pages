import React from 'react'
import data from '../../data/telefonbuch.json'
import type { ContactData } from 'types'

/**
 * Asynchronously retrieves a list of contacts from a data source.
 *
 * @returns A promise that resolves to an array of ContactData.
 */
async function getContacts(): Promise<Array<ContactData>> {
	return new Promise(resolve => {
		// Simulate an asynchronous fetch request
		setTimeout(() => {
			const jsonData = data
			resolve(jsonData)
		}, 0) // Simulating a delay of x ms
	})
}

/**
 * Custom hook to fetch contacts from an API.
 *
 * @returns An object containing data, loading state, and error state.
 */
function useContacts() {
	const [data, setData] = React.useState(null)
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState(null)

	const url = 'https://contacts.example.com/api'

	React.useEffect(() => {
		fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok')
				}
				return response.json()
			})
			.then(
				jsonData => {
					setData(jsonData)
					setLoading(false)
				},
				err => {
					setError(err)
					setLoading(false)
				},
			)
	}, [url])

	return { data, loading, error }
}

export { getContacts, useContacts }
