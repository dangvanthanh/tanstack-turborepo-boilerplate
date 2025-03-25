import type { PropsWithChildren } from 'react'
import { Link } from '@tanstack/react-router'

export function NotFound({ children }: PropsWithChildren) {
	return (
		<div>
			<div>
				{children || <p>The page you are looking for does not exist.</p>}
			</div>
			<p>
				<button type="button" onClick={() => window.history.back()}>
					Go back
				</button>
				<Link to="/">Start Over</Link>
			</p>
		</div>
	)
}
