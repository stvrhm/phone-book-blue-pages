import { Box, Container } from '@mui/material'
import { Outlet } from '@remix-run/react'
import Footer from '~/components/footer'
import { Navbar } from '~/components/navbar'

export default function ContactsRoute() {
	return (
		<Box
			display="flex"
			position="relative"
			minHeight="100vh"
			flexDirection="column"
			color="text.primary"
			bgcolor="background.default"
		>
			<Navbar />
			<Box flex={1}>
				<Container maxWidth="xl" component="main" sx={{ marginTop: 6 }}>
					<Outlet />
				</Container>
			</Box>
			<Footer />
		</Box>
	)
}
