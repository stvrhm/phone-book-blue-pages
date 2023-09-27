import React from 'react'
import data from '../../data/telefonbuch.json'
import type { ContactData } from 'types'

async function getContacts(): Promise<Array<ContactData>> {
	return new Promise(resolve => {
		// Simulate an asynchronous fetch request
		setTimeout(() => {
			const jsonData = data
			resolve(jsonData)
		}, 0) // Simulating a delay of x ms
	})
}

// custom hook to fetch contacts from some API
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
