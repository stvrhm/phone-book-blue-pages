import { Box, Container, Typography } from '@mui/material'
import Wave from 'react-wavify'
import { theme } from '~/mui/theme'

export function FooterWave() {
	return (
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
	)
}
