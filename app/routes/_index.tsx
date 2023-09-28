import { Box, Container, Stack, Typography } from '@mui/material'
import type { MetaFunction } from '@remix-run/node'
import { Navbar } from '~/components/navbar'
import { LinkButton } from '~/components/link-button'
import { FooterWave } from '~/components/footer-wave'

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
			bgcolor="background.paper"
		>
			<Navbar />
			<Box flex={1}>
				<Container maxWidth="xl" sx={{ marginTop: { xs: 6, sm: 8, md: 12 } }}>
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
							Dive in
						</LinkButton>
					</Stack>
				</Container>
			</Box>
			<FooterWave />
		</Box>
	)
}
