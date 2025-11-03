import { createFileRoute } from '@tanstack/solid-router'
import { css } from 'styled-system/css'

export const Route = createFileRoute('/')({
	component: Home,
})

function Home() {
	return (
		<div
			class={css({
				maxW: '3xl',
				mx: 'auto',
				px: { base: 4, md: 6, lg: 8 },
			})}
		>
			<div class={css({ py: 12 })}>
				<h1
					class={css({
						fontSize: '4xl',
						fontWeight: 700,
						textAlign: 'center',
						textWrap: 'pretty',
					})}
				>
					Tanstack, Solid and Turborepo Boilerplate
				</h1>
				<div class={css({ textAlign: 'center' })}>
					<a
						href="/blog"
						class={css({
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
					</a>
				</div>
			</div>
		</div>
	)
}
