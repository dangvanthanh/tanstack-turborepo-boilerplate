import { For } from 'solid-js'
import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns'

export default function Header() {
	const navs = [
		{ url: '/', name: 'Home' },
		{ url: '/blog', name: 'Blog' },
	]

	return (
		<header
			class={css({
				borderBottomWidth: 1,
				borderColor: 'neutral.200',
				py: 2,
			})}
		>
			<div
				class={css({
					maxW: '3xl',
					mx: 'auto',
					px: { base: 4, md: 6, lg: 8 },
				})}
			>
				<div class={flex({ justifyContent: 'space-between' })}>
					<a
						href="/"
						class={css({
							bg: 'neutral.900',
							color: 'white',
							px: 2,
							py: 1.5,
							rounded: 'sm',
							fontSize: 'sm',
						})}
					>
						TT
					</a>
					<nav class={flex({ align: 'center', gap: 4 })}>
						<For each={navs}>
							{({ url, name }) => (
								<a
									href={url}
									class={css({
										color: 'neutral.500',
										fontSize: 'xs',
										bg: 'neutral.100',
										py: 1.5,
										px: 3,
										rounded: 'xs',
										cursor: 'default',
										pointerEvents: 'none',
									})}
								>
									{name}
								</a>
							)}
						</For>
					</nav>
					<div class={flex({ align: 'center' })}>
						<a
							href="https://github.com/dangvanthanh/tanstack-turborepo-boilerplate"
							target="_blank"
							rel="noreferrer"
							class={css({
								px: 2,
								py: 1.5,
								rounded: 'sm',
								fontSize: 'sm',
							})}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="1em"
								height="1em"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<title>Tanstack, Solid and Turborepo Boilerplate</title>
								<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
								<path d="M9 18c-4.51 2-5-2-7-2" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</header>
	)
}
