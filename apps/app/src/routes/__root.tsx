import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from '@tanstack/solid-router'
import { TanStackRouterDevtools } from '@tanstack/solid-router-devtools'
import type * as Solid from 'solid-js'
import { HydrationScript } from 'solid-js/web'

import Header from '../components/Header'

import appCss from '../styles/app.css?url'

export const Route = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ title: 'TanStack, Solid and Turborepo Boilerplate' },
		],
		links: [
			{ rel: 'stylesheet', href: appCss },
			{
				rel: 'apple-touch-icon',
				sizes: '180x180',
				href: '/apple-touch-icon.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '32x32',
				href: '/favicon-32x32.png',
			},
			{
				rel: 'icon',
				type: 'image/png',
				sizes: '16x16',
				href: '/favicon-16x16.png',
			},
			{ rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
			{ rel: 'icon', href: '/favicon.ico' },
		],
	}),
	shellComponent: RootComponent,
})

function RootComponent(props: { children: Solid.JSX.Element }) {
	return (
		<html lang="en">
			<head>
				<HydrationScript />
			</head>
			<body>
				<HeadContent />
				<Header />
				{props.children}
				<TanStackRouterDevtools />
				<Scripts />
			</body>
		</html>
	)
}
