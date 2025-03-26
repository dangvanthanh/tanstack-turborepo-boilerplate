import { createFileRoute, Link } from '@tanstack/react-router'
import { css } from 'styled-system/css'

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	return (
		<div
			className={css({
				maxW: '2xl',
				mx: 'auto',
				px: { base: 4, md: 6, lg: 8 },
			})}
		>
			<div className={css({ py: 12 })}>
				<h1
					className={css({
						fontSize: '4xl',
						fontWeight: 700,
						textAlign: 'center',
						textWrap: 'pretty',
					})}
				>
					Tanstack, and Turborepo Boilerplate
				</h1>
				<div className={css({ textAlign: 'center' })}>
					<Link
						to="/blog"
						className={css({
							display: 'inline-block',
							bg: 'neutral.900',
							color: 'white',
							py: 2,
							px: 3,
							rounded: 'sm',
							mt: 2,
						})}
					>
						Go to Blog
					</Link>
				</div>
			</div>
		</div>
	)
}
