import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import { redirect, json } from '@remix-run/node'
import type { MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import React from 'react'

const nameRegex = /^[A-Za-zäÄüÜöÖß\s]+$/
const phoneRegex = /^\+?[1-9][0-9]{7,14}$/

export const meta: MetaFunction = () => {
	return [
		{ title: 'Add Contact | Blue Pages' },
		{ name: 'description', content: 'Job Interview Exercise' },
	]
}

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const name = String(formData.get('name'))
	const phone = String(formData.get('phone'))

	const errors = { name: '', phone: '' }

	if (nameRegex.test(name) || name === '') {
		errors.name = 'Invalid contact name'
	}

	if (phoneRegex.test(phone) || phone === '') {
		errors.phone = 'Invalid phone number'
	}

	if (Object.keys(errors).length > 0) {
		return json({ errors })
	}

	// Redirect if validation is successful
	return redirect('/')
}

export default function NewContactRoute() {
	const data = useActionData<typeof action>()
	const [errors, setErrors] = React.useState({ name: '', phone: '' })

	function handleChange(e) {
		const { name, value } = e.target
		const newErrors = { ...errors }

		if (name === 'name') {
			newErrors.name = !nameRegex.test(value) ? 'Invalid name' : ''
		}

		if (name === 'phone') {
			newErrors.phone = !phoneRegex.test(value) ? 'Invalid phone number' : ''
		}

		setErrors(newErrors)
	}

	return (
		<Box>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Stack spacing={6}>
					<Typography component="h1" variant="h4">
						Add Contact
					</Typography>

					<Form method="post">
						<TextField
							margin="normal"
							required
							fullWidth
							id="name"
							label="Name"
							name="name"
							autoFocus
							onChange={e => handleChange(e)}
							helperText={errors.name || data?.errors.name}
							error={Boolean(errors.name) || Boolean(data?.errors.name)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="phone"
							label="Phone"
							id="phone"
							onChange={e => handleChange(e)}
							helperText={errors.phone || data?.errors.phone}
							error={Boolean(errors.phone) || Boolean(data?.errors.phone)}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
							disabled={Boolean(errors.name) || Boolean(errors.phone)}
						>
							Add
						</Button>
					</Form>
				</Stack>
			</Box>
		</Box>
	)
}
