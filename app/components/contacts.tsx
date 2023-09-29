import type { CSSProperties } from 'react'
import React from 'react'
import { LocalPhone, PersonSearch, Favorite } from '@mui/icons-material'
import {
	Stack,
	Typography,
	TextField,
	Avatar,
	Dialog,
	Button,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Box,
	Grid,
	InputAdornment,
	Card,
	CardActions,
	CardHeader,
	IconButton,
} from '@mui/material'
import { matchSorter } from 'match-sorter'
import invariant from 'tiny-invariant'
import type { ContactData } from 'types'
import { FixedSizeList as List } from 'react-window'
import { getInitials } from '~/utils/misc'

interface ContactCardProps {
	n: number
	contact: ContactData
	style: CSSProperties
	onClick: () => void
}

function ContactCard({ n, contact, style, onClick }: ContactCardProps) {
	const initials = getInitials(contact.name)

	return (
		<Box
			display="flex"
			flexDirection="row"
			paddingY={1}
			paddingTop={n === 0 ? 0 : ''}
			maxWidth={500}
			style={style}
		>
			<Card
				sx={{
					display: 'flex',
					width: '100%',
				}}
			>
				<Box display="flex" flexDirection="row" width={'100%'}>
					<CardHeader
						sx={{ flex: '1 0 auto' }}
						avatar={
							<Avatar
								sx={{ bgcolor: 'primary.main' }}
								aria-label="contact name initials"
							>
								{initials}
							</Avatar>
						}
						title={contact.name}
						subheader={contact.phone}
					/>
					<CardActions>
						<IconButton
							aria-label="add to favorites"
							onClick={() =>
								alert(`Add ${contact.name} to your favorite contacts.`)
							}
						>
							<Favorite />
						</IconButton>
						<IconButton aria-label="call" onClick={onClick}>
							<LocalPhone />
						</IconButton>
					</CardActions>
				</Box>
			</Card>
		</Box>
	)
}

interface ContactListProps {
	entries: Array<ContactData>
	onSelect: (contact: ContactData, openDialog: boolean) => void
}

function ContactList({ entries, onSelect }: ContactListProps) {
	/**
	 * Handles the action of initiating a call for a specific contact entry.
	 *
	 * @param entry - The contact data for which the call is initiated.
	 */
	function handleCall(entry: ContactData) {
		// Call the 'onSelect' function with the provided contact entry and 'true' to open the dialog
		onSelect(entry, true)
	}

	return (
		<Box>
			{entries.length === 0 ? (
				<Typography variant="body1">
					Start typing a name in the search field to find contacts.
				</Typography>
			) : (
				<List
					height={400}
					width={'100%'}
					itemSize={80}
					itemCount={entries.length}
					itemData={entries}
				>
					{({ index, style, data }) => {
						const contact = data[index]

						return (
							<ContactCard
								key={contact.phone}
								onClick={() => handleCall(contact)}
								n={index}
								contact={contact}
								style={style}
							/>
						)
					}}
				</List>
			)}
		</Box>
	)
}

interface ContactDialogProps {
	isOpen: boolean
	onClose: () => void
	contact: ContactData | null
}

function ContactDialog({ isOpen, onClose, contact }: ContactDialogProps) {
	if (!contact) return

	/**
	 * Handles initiating a phone call when a phone number is provided.
	 *
	 * @param phone - The phone number to call, in string format.
	 */
	const handleCall = (phone: string) => {
		// Ensure that a valid phone number is provided, otherwise throw error
		invariant(phone, 'Phone is required')

		// Open the phone dialer with the provided phone number
		window.open(`tel:${phone}`)
	}

	return (
		<Dialog
			open={isOpen}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{`Call ${contact?.name}?`}
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{`To call ${contact?.phone}, you need a phone-capable device.`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>CANCEL</Button>
				<Button onClick={() => handleCall(contact?.phone ?? '')}>CALL</Button>
			</DialogActions>
		</Dialog>
	)
}

interface ContactSearchCountProps {
	count: number
}

function ContactSearchCount({ count }: ContactSearchCountProps) {
	// Don't show counter if there are no results
	if (count < 1) return
	return <Typography>Found {count} contacts.</Typography>
}

interface ContactSearchProps {
	term: string
	setTerm: React.Dispatch<React.SetStateAction<string>>
	color: 'primary' | 'secondary'
}

function ContactSearch({ term, setTerm, color }: ContactSearchProps) {
	const [error, setError] = React.useState<string>('')

	/**
	 * Handles input changes in a search input field.
	 *
	 * @param event - The `React.ChangeEvent` object representing the input change event.
	 */
	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		// Get the value from the input field
		const input = event.target.value

		// Define a regular expression to validate the input
		const regex = /^[A-Za-zäÄüÜöÖß\s]+$/

		if (regex.test(input) || input === '') {
			// If the input is valid or empty, update the search term and clear any error
			setTerm(input)
			setError('')
		} else {
			// If the input is invalid, set an error message
			setError('Only letters and spaces are allowed.')
		}
	}

	return (
		<Box>
			<TextField
				name="name"
				label="Search contact name"
				variant="outlined"
				onChange={handleSearch}
				color="primary"
				placeholder="e.g. Joseph Quinn"
				value={term}
				helperText={error}
				error={Boolean(error)}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<PersonSearch color="primary" />
						</InputAdornment>
					),
				}}
				style={{ width: '100%' }}
			/>
		</Box>
	)
}

interface ContactsProps {
	contacts: Array<ContactData>
	color?: 'primary' | 'secondary'
}

function Contacts({ contacts, color = 'primary' }: ContactsProps) {
	const [searchTerm, setSearchTerm] = React.useState<string>('')
	const [items, setItems] = React.useState<Array<ContactData>>([])
	const [selectedContact, setSelectedContact] = React.useState<{
		name: string
		phone: string
	} | null>(null)
	const [dialogOpen, setDialogOpen] = React.useState<boolean>(false)

	const getItems = React.useCallback(
		(value: string) => {
			return value
				? matchSorter(contacts, value, {
						keys: ['name'],
				  })
				: []
		},
		[contacts],
	)

	React.useEffect(() => {
		const newItems = getItems(searchTerm)
		setItems(newItems)
	}, [getItems, searchTerm])

	function handleSelectContact(contact: ContactData, openDialog: boolean) {
		setSelectedContact(contact)
		setDialogOpen(openDialog)
	}

	return (
		<Box>
			<Grid container rowGap={2}>
				<Grid item xs={12} md={3}>
					<Box>
						<Stack spacing={2} maxWidth="sm">
							<ContactSearch
								term={searchTerm}
								setTerm={setSearchTerm}
								color={color}
							/>
							<ContactSearchCount count={items.length} />
						</Stack>
					</Box>
				</Grid>
				<Grid item xs={12} md={9} paddingLeft={{ xs: '0', md: 4 }}>
					<Stack spacing={1} maxWidth="60ch">
						<Typography variant="h6">Results</Typography>
						{searchTerm.length > 1 && items.length < 1 ? (
							<Box>Sorry, nothing found.</Box>
						) : (
							<ContactList entries={items} onSelect={handleSelectContact} />
						)}
					</Stack>
				</Grid>
			</Grid>

			<ContactDialog
				isOpen={dialogOpen}
				onClose={() => setDialogOpen(false)}
				contact={selectedContact}
			/>
		</Box>
	)
}

export {
	ContactCard,
	ContactDialog,
	ContactList,
	Contacts,
	ContactSearch,
	ContactSearchCount,
}
