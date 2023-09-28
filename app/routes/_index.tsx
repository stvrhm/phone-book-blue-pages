import { Box, Container, Stack, Typography } from '@mui/material'
import type { MetaFunction } from '@remix-run/node'
import { Navbar } from '~/components/navbar'
import Footer from '~/components/footer'
import { LinkButton } from '~/components/link-button'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Blue Pages - Phone Book' },
		{ name: 'description', content: 'Job Interview Exercise' },
	]
}

export default function Index() {
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
				<Container maxWidth="xl" sx={{ marginTop: 6 }}>
					<Stack spacing={6} maxWidth="sm">
						<Typography component="h1" variant="h2">
							Your Digital <strong>Rolodex</strong>
							<br></br>for the <strong>Modern Age</strong>
							<Typography
								component="span"
								variant="h1"
								display="inline"
								lineHeight={0}
								color="primary"
							>
								.
							</Typography>
						</Typography>

						<Typography variant="body1">
							Quick and easy contact search.
						</Typography>

						<LinkButton to="/contacts" variant="contained">
							Get Started
						</LinkButton>
					</Stack>
				</Container>
			</Box>
			<Footer />
		</Box>
	)
}
