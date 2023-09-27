import { Link } from '@remix-run/react'
import { Button as MuiButton } from '@mui/material'
import { type ButtonProps as MuiButtonProps } from '@mui/material'
import type { RemixLinkProps } from '@remix-run/react/dist/components'

type ButtonProps = MuiButtonProps & RemixLinkProps

export function LinkButton(props: ButtonProps) {
	const {
		prefetch,
		reloadDocument,
		replace,
		state,
		preventScrollReset,
		relative,
		to,
		...muiButtonProps
	} = props
	const linkProps = {
		prefetch,
		reloadDocument,
		replace,
		state,
		preventScrollReset,
		relative,
		to,
	}
	return (
		<Link {...linkProps}>
			<MuiButton {...muiButtonProps} />
		</Link>
	)
}
