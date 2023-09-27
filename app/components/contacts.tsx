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
	onClick: any
}

export function ContactCard({ n, contact, style, onClick }: ContactCardProps) {
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
								sx={{ bgcolor: 'secondary.main' }}
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
	onSelect: any
}

const TOP_PADDING = 12

const Inner = React.forwardRef<any, any>(({ style, ...rest }, ref) => (
	<div
		ref={ref}
		style={{
			...style,
			height: `${parseFloat(style.height) + TOP_PADDING}px`,
		}}
		{...rest}
	/>
))

export function ContactList({ entries, onSelect }: ContactListProps) {
	function handleCall(entry: ContactData) {
		onSelect(entry, true)
	}

	if (entries.length === 0) {
		return (
			<Box maxHeight={500} height={'50vh'}>
				<Typography variant="body1">
					Start typing a name in the search field to find contacts in our phone
					book. We'll help you find the information you need.
				</Typography>
			</Box>
		)
	}

	return (
		<FixedSizeList
			height={800}
			width={'100%'}
			itemSize={80}
			innerElementType={Inner}
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
	)
}

interface ContactDialogProps {
	isOpen: boolean
	onClose: () => void
	contact: ContactData | null
}

export function ContactDialog({
	isOpen,
	onClose,
	contact,
}: ContactDialogProps) {
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

export function ContactSearchCount({ count }: { count: number }) {
	if (count < 1) return
	return <Typography>Found {count} contacts.</Typography>
}

interface ContactSearchProps {
	term: string
	setTerm: any
}

export function ContactSearch({ term, setTerm }: ContactSearchProps) {
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
				label="Search for a contact name"
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

export function Contacts({ contacts }: { contacts: Array<ContactData> }) {
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
		<React.Fragment>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Box>
						<Stack
							spacing={2}
							maxWidth="sm"
							sx={{ marginLeft: 'auto', marginRight: 'auto' }}
						>
							<ContactSearch term={searchTerm} setTerm={setSearchTerm} />
							<ContactSearchCount count={items.length} />
						</Stack>
					</Box>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Box>
						{searchTerm.length > 1 && items.length < 1 ? (
							<Box>Damn.</Box>
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
		</React.Fragment>
	)
}
