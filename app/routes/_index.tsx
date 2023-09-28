import { Box, Container, Stack, Typography } from '@mui/material'
import type { MetaFunction } from '@remix-run/node'
import { Navbar } from '~/components/navbar'
import Footer from '~/components/footer'
import { LinkButton } from '~/components/link-button'
import Wave from 'react-wavify'
import { blue } from '@mui/material/colors'
import { theme } from '~/mui/theme'

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
							Dive in
						</LinkButton>
					</Stack>
				</Container>
			</Box>
			<Box position="relative" height="25vh">
				<Box
					position="absolute"
					top={'50%'}
					bottom={0}
					left={0}
					right={0}
					zIndex={10}
				>
					<Container maxWidth="xl">
						<Box py={4}>
							<Typography variant="body2" color="#fff">
								Your contacts, your way. © 2023 Blue Pages - Phone Book. All
								rights reserved.
							</Typography>
						</Box>
					</Container>
				</Box>
				<Wave
					fill={theme.palette.primary.main}
					paused={false}
					style={{ display: 'flex', height: '100%' }}
					options={{
						height: 20,
						amplitude: 20,
						speed: 0.15,
						points: 3,
					}}
				/>
			</Box>
		</Box>
	)
}
