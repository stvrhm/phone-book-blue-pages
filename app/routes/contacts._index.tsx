import { Contacts } from '~/components/contacts'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { defer } from '@remix-run/node'
import type { MetaFunction } from '@remix-run/react'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'
import { getContacts } from '~/utils/contacts'
// 👇🏼 util function for testing pending ui
// import { slow } from '~/utils/misc'
import { useThemeContext } from '~/mui/theme-provider'

export async function loader() {
	const contacts = getContacts()
	// 👇🏼 testing pending ui
	// const contacts = getContacts().then(slow(1000))

	return defer({
		contacts,
	})
}

export const meta: MetaFunction = () => {
	return [
		{ title: 'Search Contact | Blue Pages' },
		{ name: 'description', content: 'Job Interview Exercise' },
	]
}

export default function ContactsHomeRoute() {
	const { contacts } = useLoaderData<typeof loader>()
	const { theme } = useThemeContext()

	return (
		<Paper
			sx={{
				padding: 3,
				minHeight: '700px',
				height: '75vh',
				maxHeight: '75h',
				flex: 1,
				bgcolor: theme.palette.background.default,
				overflow: 'hidden',
			}}
			elevation={6}
		>
			<Stack spacing={6}>
				<Typography component="h1" variant="h4">
					Search Phone Book
				</Typography>
				<Suspense
					fallback={
						<Box height={'75vh'}>
							<Typography variant="body1">Loading...</Typography>
						</Box>
					}
				>
					<Await resolve={contacts}>
						{contacts => <Contacts contacts={contacts} color="secondary" />}
					</Await>
				</Suspense>
			</Stack>
		</Paper>
	)
}
