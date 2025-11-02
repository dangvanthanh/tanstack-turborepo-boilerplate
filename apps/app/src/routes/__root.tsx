import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'

import { HydrationScript } from 'solid-js/web'
import { Suspense } from 'solid-js'

import Header from '../components/Header'

import styles from '../styles/app.css?url'

export const Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'TanStack, Solid and Turborepo Boilerplate' },
		],
		links: [{ rel: 'stylesheet', href: styles }],
	}),
	shellComponent: RootComponent,
})

function RootComponent() {
	return (
		<html lang="en">
			<head>
				<HeadContent />
				<HydrationScript />
			</head>
			<body>
				<Suspense>
					<Header />
					<Outlet />
					<TanStackRouterDevtools />
				</Suspense>
				<Scripts />
			</body>
		</html>
	)
}
