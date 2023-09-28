import { Box, Container } from '@mui/material'
import { blue, deepPurple, grey, indigo } from '@mui/material/colors'
import { Outlet } from '@remix-run/react'
import Footer from '~/components/footer'
import { Navbar } from '~/components/navbar'
import { useThemeContext } from '~/mui/theme-provider'

export default function ContactsRoute() {
	const { theme } = useThemeContext()

	return (
		<Box
			display="flex"
			position="relative"
			minHeight="100vh"
			flexDirection="column"
			color="background.default"
			bgcolor={theme.palette.mode === 'light' ? blue['A700'] : grey['900']}
		>
			<Navbar color="secondary" />
			<Box flex={1}>
				<Container maxWidth="xl" component="main" sx={{ marginTop: 6 }}>
					<Outlet />
				</Container>
			</Box>
			<Footer />
		</Box>
	)
}
