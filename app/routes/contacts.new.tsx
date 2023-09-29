import { Box, Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { redirect, json } from '@remix-run/node'
import type { MetaFunction, ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import React from 'react'

const nameRegex = /^[A-Za-zäÄüÜöÖß\s]+$/
const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/

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

	// Validate the 'name' input using a regular expression and check for empty input
	if (nameRegex.test(name) || name === '') {
		errors.name = 'Invalid contact name'
	}

	// Validate the 'phone' input using a regular expression and check for empty input
	if (phoneRegex.test(phone) || phone === '') {
		errors.phone = 'Invalid phone number'
	}

	// Check if there are any errors
	if (Object.keys(errors).length > 0) {
		// Return a JSON response containing the validation errors if there are any
		return json({ errors })
	}

	// Redirect the user to the home page if validation is successful
	return redirect('/')
}

export default function NewContactRoute() {
	const data = useActionData<typeof action>()
	const [errors, setErrors] = React.useState({ name: '', phone: '' })

	/**
	 * Handle input changes and validate input values based on regular expressions.
	 *
	 * @param event - The `React.ChangeEvent` object representing the input change event.
	 */
	function handleChange(
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) {
		// Extract 'name' and 'value' from the input event
		const { name, value } = event.target

		// Creates a new object to store updated error messages
		const newErrors = { ...errors }

		// Validate the 'name' input using a regular expression
		if (name === 'name') {
			newErrors.name = !nameRegex.test(value) ? 'Invalid name' : ''
		}

		// Validate the 'phone' input using a regular expression
		if (name === 'phone') {
			newErrors.phone = !phoneRegex.test(value) ? 'Invalid phone number' : ''
		}

		// Set the updated error messages in the state using 'setErrors' function
		setErrors(newErrors)
	}

	return (
		<Box>
			<Box
				marginTop={8}
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<Paper sx={{ padding: 3 }} elevation={6}>
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
								Add Contact
							</Button>
						</Form>
					</Stack>
				</Paper>
			</Box>
		</Box>
	)
}
