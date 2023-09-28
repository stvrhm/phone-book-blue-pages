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
import { FixedSizeList } from 'react-window'
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
			<Card sx={{ display: 'flex', width: '100%' }}>
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
	function handleCall(entry: ContactData) {
		onSelect(entry, true)
	}

	return (
		<Stack spacing={1}>
			<Typography variant="h6">Results</Typography>
			{entries.length === 0 ? (
				<Box maxHeight={500} height={'50vh'}>
					<Typography variant="body1">
						Start typing a name in the search field to find contacts.
					</Typography>
				</Box>
			) : (
				<FixedSizeList
					height={380}
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
				</FixedSizeList>
			)}
		</Stack>
	)
}

interface ContactDialogProps {
	isOpen: boolean
	onClose: () => void
	contact: ContactData | null
}

function ContactDialog({ isOpen, onClose, contact }: ContactDialogProps) {
	if (!contact) return

	const handleCall = (phone: string) => {
		invariant(phone, 'Phone is required')
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
	if (count < 1) return
	return <Typography>Found {count} contacts.</Typography>
}

interface ContactSearchProps {
	term: string
	setTerm: React.Dispatch<React.SetStateAction<string>>
}

function ContactSearch({ term, setTerm }: ContactSearchProps) {
	const [error, setError] = React.useState<string>('')

	// Handle real-time search as the user types
	function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
		const input = event.target.value
		// Regular expression to allow only letters and spaces
		// const regex = /^[A-Za-z\s]+$/
		const regex = /^[A-Za-zäÄüÜöÖß\s]+$/

		if (regex.test(input) || input === '') {
			setTerm(input)
			setError('')
		} else {
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
			/>
		</Box>
	)
}

function Contacts({ contacts }: { contacts: Array<ContactData> }) {
	const [searchTerm, setSearchTerm] = React.useState<string>('')
	const [items, setItems] = React.useState<{ name: string; phone: string }[]>(
		[],
	)
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
				<Grid item xs={12} md={4}>
					<Box>
						<Stack spacing={2} maxWidth="sm">
							<ContactSearch term={searchTerm} setTerm={setSearchTerm} />
							<ContactSearchCount count={items.length} />
						</Stack>
					</Box>
				</Grid>
				<Grid item xs={12} md={8} paddingLeft={{ xs: '0', md: 2 }}>
					<Box maxWidth="60ch">
						{searchTerm.length > 1 && items.length < 1 ? (
							<Box>Sorry, nothing found.</Box>
						) : (
							<ContactList entries={items} onSelect={handleSelectContact} />
						)}
					</Box>
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
