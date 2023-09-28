import { Box, Container, Typography } from '@mui/material'

export default function Footer() {
	return (
		<Container maxWidth="xl" sx={{ mt: 3 }}>
			<Box py={4}>
				<Typography variant="body2">
					Your contacts, your way. © 2023 Blue Pages - Phone Book. All rights
					reserved.
				</Typography>
			</Box>
		</Container>
	)
}
