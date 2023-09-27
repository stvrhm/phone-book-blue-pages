import { Contacts } from '~/components/contacts'
import { Box, Stack, Typography } from '@mui/material'
import { defer } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/react'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import { getContacts } from '~/utils/contacts'
import { slow } from '~/utils/misc'

export async function loader() {
	const contacts = getContacts()
	// testing pending ui
	// const contacts = getContacts().then(slow(1000))

	return defer({
		contacts,
	})
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Phone Book | Geomagic' },
		{ name: 'description', content: 'Job Interview Exercise' },
	]
}

export default function ContactsHomeRoute() {
	const { contacts } = useLoaderData<typeof loader>()

	return (
		<Box>
			<Stack spacing={6}>
				<Typography component="h1" variant="h3">
					Contacts
				</Typography>
				<Suspense
					fallback={
						<Box maxHeight={500} height={'50vh'}>
							<Typography variant="body1">Loading...</Typography>
						</Box>
					}
				>
					<Await resolve={contacts}>
						{contacts => <Contacts contacts={contacts} />}
					</Await>
				</Suspense>
			</Stack>
		</Box>
	)
}
