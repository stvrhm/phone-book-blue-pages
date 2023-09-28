import React from 'react'
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Box,
	Drawer,
	Divider,
	List,
	ListItem,
} from '@mui/material'
import { Menu } from '@mui/icons-material'
import { LinkButton } from './link-button'
import { ThemeToggle } from './theme-toggle'

const drawerWidth = 240
const navItems = [
	{
		id: 0,
		name: 'Home',
		slug: '/',
	},
	{
		id: 1,
		name: 'Contacts',
		slug: '/contacts',
	},
]

interface NavbarProps {
	color?: 'primary' | 'secondary'
}

export function Navbar({ color = 'primary' }: NavbarProps) {
	const [mobileOpen, setMobileOpen] = React.useState(false)

	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState)
	}

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				Blue Pages
			</Typography>
			<Divider />
			<List>
				{navItems.map(item => (
					<ListItem
						key={item.id}
						disablePadding
						sx={{ justifyContent: 'center' }}
					>
						<LinkButton key={item.id} to={item.slug}>
							{item.name}
						</LinkButton>
					</ListItem>
				))}
				<ListItem disablePadding sx={{ justifyContent: 'center', my: 1 }}>
					<LinkButton
						to="../contacts/new"
						size="small"
						color="primary"
						variant="outlined"
					>
						New Contact
					</LinkButton>
				</ListItem>
				<ListItem disablePadding sx={{ justifyContent: 'center' }}>
					<ThemeToggle />
				</ListItem>
			</List>
		</Box>
	)

	return (
		<Box component="header" bgcolor="background">
			<Box
				display="flex"
				marginLeft="auto"
				marginRight="auto"
				width={'100%'}
				maxWidth="xl"
			>
				<AppBar
					component="nav"
					position="static"
					color="transparent"
					sx={{ boxShadow: 'none' }}
				>
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							color={color}
							sx={{ flexGrow: 1 }}
						>
							Blue Pages
						</Typography>
						<Box
							sx={{ display: { xs: 'none', sm: 'flex' } }}
							alignItems="center"
							gap={2}
						>
							<Box>
								{navItems.map(item => (
									<LinkButton key={item.id} to={item.slug} color={color}>
										{item.name}
									</LinkButton>
								))}
							</Box>

							<LinkButton
								to="../contacts/new"
								size="small"
								variant="outlined"
								color={color}
							>
								New Contact
							</LinkButton>
							<ThemeToggle />
						</Box>
						<IconButton
							color={color}
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							sx={{ display: { sm: 'none' } }}
						>
							<Menu />
						</IconButton>
					</Toolbar>
				</AppBar>
				<nav>
					<Drawer
						anchor="right"
						variant="temporary"
						color={color}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
						sx={{
							display: { xs: 'block', sm: 'none' },
							'& .MuiDrawer-paper': {
								boxSizing: 'border-box',
								width: drawerWidth,
							},
						}}
					>
						{drawer}
					</Drawer>
				</nav>
			</Box>
		</Box>
	)
}
